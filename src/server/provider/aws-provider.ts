import * as awsConfig from 'aws-config';
import { DynamoDB } from 'aws-sdk/clients/all';
import * as _ from 'lodash';

import { Logger } from '../util/logger';

const log = Logger.create(module);

export module AWSProvider {

  /**
   * Extends an object with the base AWS configuration
   * @return new object with base aws configuration overwritten
   */
  export const extendWithAWSConfig = (options: any = {}): any => {
    if (process.env.AWS_ACCESS_KEY_ID == null) {
      log.error('Environmental variable `AWS_ACCESS_KEY_ID` was not found!');
    }
    if (process.env.AWS_ACCESS_KEY_SECRET == null) {
        log.error('Environmental variable `AWS_ACCESS_KEY_SECRET` was not found!');
    }

    return _.defaults({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        region: 'us-east-2',
    }, options);
  };

  const GLOBAL_CONFIG = awsConfig(extendWithAWSConfig({
    sslEnabled: true,
    maxRetries: 2,
  }));

  /**
   * @return singleton DynamoDB client.
   */
  export const getDynamoClient = _.memoize((): DynamoDB => {
    return new DynamoDB(GLOBAL_CONFIG);
  });

}
