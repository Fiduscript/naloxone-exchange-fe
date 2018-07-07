import * as awsConfig from 'aws-config';
import { DynamoDB } from 'aws-sdk/clients/all';
import * as _ from 'lodash';

require('dotenv').config();

export module AWSClientProvider {

  const GLOBAL_CONFIG = awsConfig({
    region: 'us-east-2',
    sslEnabled: true,
    maxRetries: 2,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  });

  /**
   * @return singleton DynamoDB client.
   */
  export const getDynmoClient = _.memoize((): DynamoDB => {
     return new DynamoDB(GLOBAL_CONFIG);
  });
}
