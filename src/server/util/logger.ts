import * as crypto from 'crypto';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as winstonTS from 'winston';

// Winston has compatability issues with typescript so the modules must be imported the traditional way.
const winston = require('winston');
const WinstonCloudwatch = require('winston-cloudwatch');
const isProduction = process.env.NODE_ENV === 'production';

export module Logger {

  const levels = {
    levels: {
      audit: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4,
    },
    colors: {
      error: 'red',
      warn: 'yellow',
      audit: 'cyan',
      info: 'green',
      debug: 'magenta',
    }
  };

  winston.addColors(levels.colors);

  const cloudWatchOptions = {
    logGroupName: isProduction ? 'NaloxoneExchangeFrontEnd-production' : 'NaloxoneExchangeFrontEnd-testing',
    logStreamName: () => {
      const date = moment().utc().format('YYYY-MM-DD-HH');
      const hash = crypto.createHash('md5').update(moment().toISOString()).digest('hex');
      return `audit-trail-${date}-${hash}`;
    },
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_ACCESS_KEY_SECRET,
    awsRegion: 'us-east-2',
    level: 'audit'
  };

  const basePath: string = process.mainModule.filename.split('/').slice(0, -2).join('/') + '/dist/server/';
  export const create = (callingModule: NodeModule): ILogger => {
    const label: string = callingModule.filename.replace(basePath, '').replace(/js$/, 'ts');
    const baseConfig = {
      format:  winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.printf((info) => {
          const timestamp: string = moment().utc().format('YYYY-MM-DD HH:mm:ss.SSS');
          const metadata: string = (info.meta != null && !_.isEmpty(info.meta)) ? '\n\t' + JSON.stringify(info.meta) : '';
          return `${timestamp} [${info.level}] (${label}): ${info.message || ''}${metadata}`;
        }))
      };

    const transports = [
      new (winston.transports.Console)(baseConfig),
      new WinstonCloudwatch(cloudWatchOptions)
    ];

    return <ILogger> winston.createLogger({
      level: isProduction ? 'info' : 'debug',
      levels: levels.levels,
      transports: transports
    });
  };
}

/**
 * Stupid little interface to show Typescript that our new logger includes 'audit' logs.
 */
interface ILogger extends winstonTS.Logger {
  audit: winstonTS.LeveledLogMethod;
}
