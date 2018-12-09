import {UserAddress} from '../../public/app/account/model/user-address';
import {Dependent} from '../../public/app/account/model/dependent';

import {DynamoDB} from 'aws-sdk/clients/all';
import {ErrorMessage, SuccessMessage} from '../../public/app/common/message-response';
import {AWSError} from 'aws-sdk/lib/error';
import {AWSProvider} from '../provider/aws-provider';
import {Logger} from '../util/logger';

const TABLE_NAME: string = 'user_addresses';
const ddb: DynamoDB = AWSProvider.getDynamoClient();
const log = Logger.create(module);

export interface UsersDao {
  getAddressesForUser(id: string): [UserAddress];
  // createAddressForUser(id: string): [UserAddress];
  // deleteAddressForUser(userId: string);
  // getDependentsForUser(id: string): [Dependent];
  // createDependent(userId: string, dependent: Dependent);
  // updateDependent(userId: string, dependent: Dependent);
}

class UsersDaoDdb implements UsersDao {
  getAddressesForUser(userId: string): [UserAddress] {

    const params: DynamoDB.GetItemInput = {
      TableName: TABLE_NAME,
      Key: {
        'user_id': {S: userId}
      }
    };

    ddb.query(params, (err: AWSError, data: DynamoDB.Types.GetItemOutput) => {
      if (err != null) {
        log.error(`Failed to unsubscribe customer \`${params}\`.`, err.message, err);
        return []; // todo what to do?
      }

      return DynamoDB.Converter.marshall(data.Item); // todo prob wrong
    });
    return null;
  }


  // deleteAddressForUser(userId: string): void {
  //
  //   const params: DynamoDB.DeleteItemInput = {
  //     TableName: TABLE_NAME,
  //     Key: DynamoDB.Converter.marshall(userId)
  //   };
  //
  //   ddb.deleteItem(params, (err: AWSError, data: DynamoDB.PutItemOutput) => {
  //     if (err != null) {
  //       log.error(`Failed to unsubscribe customer \`${params}\`.` , err.message, err);
  //       res.status(500).json(new ErrorMessage('Unable to unsubscribe at this time. Please try again later.'));
  //     } else {
  //       res.status(201).json(new SuccessMessage('Successfully unsubscribed!'));
  //     }
  //   });
  // }
  // const params: DynamoDB.PutItemInput = {
  //   TableName: TABLE_NAME,
  //   Item: DynamoDB.Converter.marshall(req.body)
  // };
}
//
// function printLabel(labelledObj: LabelledValue) {
//   console.log(labelledObj.labels);
// }
//
// const myObj = {size: 10, label: 'Size 10 Object'};
// printLabel(myObj);
