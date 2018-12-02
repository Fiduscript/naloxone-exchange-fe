import { CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js';
import * as _ from 'lodash';
import {UserAddress} from '../../public/app/account/model/user-address';
import {Dependent} from '../../public/app/account/model/dependent';

import {DynamoDB} from 'aws-sdk/clients/all';
import {ErrorMessage, SuccessMessage} from '../../public/app/common/message-response';
import {AWSError} from 'aws-sdk/lib/error';
import {AWSProvider} from '../provider/aws-provider';

const TABLE_NAME: string = 'user_addresses';
const ddb: DynamoDB = AWSProvider.getDynmoClient();

export interface UsersDao {
  getAddressesForUser(id: string): [UserAddress];
  createAddressForUser(id: string): [UserAddress];
  deleteAddressForUser(userId: string);
  getDependentsForUser(id: string): [Dependent];
  createDependent(userId: string, dependent: Dependent);
  updateDependent(userId: string, dependent: Dependent);
}

class UsersDaoDdb implements UsersDao {
  getAddressesForUser(id: string): [UserAddress] {
    return null;
  }

  deleteAddressForUser(userId: string): void {

    const params: DynamoDB.DeleteItemInput = {
      TableName: TABLE_NAME,
      Key: DynamoDB.Converter.marshall(userId)
    };

    ddb.deleteItem(params, (err: AWSError, data: DynamoDB.PutItemOutput) => {
      if (err != null) {
        log.error(`Failed to unsubscribe customer \`${params}\`.` , err.message, err);
        res.status(500).json(new ErrorMessage('Unable to unsubscribe at this time. Please try again later.'));
      } else {
        res.status(201).json(new SuccessMessage('Successfully unsubscribed!'));
      }
    });
  }
  const params: DynamoDB.PutItemInput = {
    TableName: TABLE_NAME,
    Item: DynamoDB.Converter.marshall(req.body)
  };
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.labels);
}

const myObj = {size: 10, label: 'Size 10 Object'};
printLabel(myObj);
