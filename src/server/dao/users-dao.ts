import {IUserAddress, UserAddress} from '../../public/app/account/model/user-address';

import {DataMapper, QueryPaginator} from '@aws/dynamodb-data-mapper';
import {DynamoDB} from 'aws-sdk/clients/all';
import * as _ from 'lodash';
import {AWSProvider} from '../provider/aws-provider';
import {Logger} from '../util/logger';

import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';


const TABLE_NAME: string = 'user_addresses_test';
const ddb: DynamoDB = AWSProvider.getDynamoClient();
const mapper = new DataMapper({
  client: ddb,
});



const log = Logger.create(module);

// export interface UsersDao {
//   getAddressesForUser(id: string): [UserAddress];
  // createAddressForUser(id: string): [UserAddress];
  // deleteAddressForUser(userId: string);
  // getDependentsForUser(id: string): [Dependent];
  // createDependent(userId: string, dependent: Dependent);
  // updateDependent(userId: string, dependent: Dependent);
// }

@table(TABLE_NAME)
class AddressDdbEntity implements IUserAddress {

  @attribute()
  city: string;

  @rangeKey({defaultProvider: () => new Date()})
  createdOn: Date;

  @attribute()
  name: string;

  @attribute()
  state: string;

  @attribute()
  street: string;

  @attribute()
  street2: string;
  @hashKey()
  userId: string;

  @attribute()
  zip: string;
}

export class UsersDao {

  public static create = _.once((): UsersDao => {
    return new UsersDao();
  });


  createAddress(address: IUserAddress): Promise<IUserAddress> {
    const toSave = Object.assign(new AddressDdbEntity, address);
    return new Promise((resolve, reject) => {
      mapper.put(toSave).then(objectSaved => {
        log.info('saved!');
        log.info(objectSaved);
        resolve(objectSaved);
      }).catch(err => {
        log.info('fuck!');
        log.info(err);
        reject('error!!!!!!!');
      });
    });
  }


  async getAddressesForUser(userId: string): Promise<IUserAddress[]> {

    // const params: DynamoDB.QueryInput = {
    //   TableName: TABLE_NAME,
    //   KeyConditionExpression: 'user_id = :p1',
    //   ExpressionAttributeValues: {
    //     ':p1': {S: userId}
    //   }
    // };


    const paginator = new QueryPaginator(ddb, AddressDdbEntity, {user_id: userId});

    //
    paginator.next().then((addresses: IteratorResult<Array<AddressDdbEntity>>) => {
      return;
    });
    // for await (const address: AddressDdbEntity of paginator) {
    //
    //   log.info('asdf');
    //   log.info(JSON.stringify(address));
    //   // total.push(address);
    //   // individual items with a hash key of "foo" will be yielded as the query is performed
    // }
    //
    // return null;
    return null;
  }


  // const attributeMap: DynamoDB.AttributeMap = {
  //   TableName: TABLE_NAME,
  //   KeyConditionExpression: 'user_id = :p1',
  //   ExpressionAttributeValues: {
  //     ':p1': {S: userId}
  //   }
  // };

  // ddb.query(params, (err: AWSError, data: DynamoDB.Types.QueryOutput) => {
  //   if (err != null) {
  //     log.error(`Failed retrieve addresses for user \`${params}\`.`, err.message, err);
  //     log.error(err.message);
  //     log.error(JSON.stringify(err));
  //     return []; // todo what to do?
  //   }
  //
  //   log.info("worked!");
  //   data.Items.forEach((datum, index, array) => {
  //     log.info(JSON.stringify(datum));
  //   });
  //   // return data.Items;
  //   return DynamoDB.Converter.unmarshall(data); // todo prob wrong
  // });
  // return null;



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

