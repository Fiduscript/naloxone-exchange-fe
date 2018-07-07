import * as _ from 'lodash';
import * as moment from 'moment';
import * as path from 'path';
import * as winston from 'winston';

const isDevelopment = process.env.NODE_ENV === 'development';

export namespace Logger {
  const levels = {
    levels: {
      error: 0,
      warn: 1,
      audit: 2,
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

  const basePath: string = process.mainModule.filename.split('/').slice(0, -2).join('/') + '/dist/server/';
  export const create = (callingModule: NodeModule): ILogger => {
    const label: string = callingModule.filename.replace(basePath, '').replace(/js$/, 'ts');
    const config = {
      format:  winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.printf((info) => {
          const timestmap: string = moment().utc().format('YYYY-MM-DD HH:mm:ss.SSS');
          const metadata: string = (info.meta != null && !_.isEmpty(info.meta)) ? '\n\t' + JSON.stringify(info.meta) : '';
          return `${timestmap} [${info.level}] (${label}): ${info.message || ''}${metadata}`;
        }))
      };

    const transports = [
      new (winston.transports.Console)(config)
    ];

    return <ILogger> winston.createLogger({
      level: isDevelopment ? 'debug' : 'info',
      levels: levels.levels,
      transports: transports
    });
  };
}

/**
 * Stupid little interface to show Typescript that our new logger has the property 'audit'.
 */
interface ILogger extends winston.Logger {
  audit(message: string, callback?: winston.LogCallback): void;
}
