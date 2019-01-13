import {IUserAddress} from '../../public/app/account/model/user-address';
import {DataMapper} from '@aws/dynamodb-data-mapper';
import {DynamoDB} from 'aws-sdk/clients/all';
import * as _ from 'lodash';
import {AWSProvider} from '../provider/aws-provider';

import {attribute, hashKey, rangeKey, table,} from '@aws/dynamodb-data-mapper-annotations';

const uuidV4 = require('uuid/v4');
const ddb: DynamoDB = AWSProvider.getDynamoClient();
const TABLE_NAME = 'user_address_test_two';
const mapper = new DataMapper({
  client: ddb,
});

@table(TABLE_NAME)
class AddressDdbEntity implements IUserAddress {

  @hashKey()
  userId: string;

  @rangeKey({defaultProvider: () => uuidV4()})
  addressId: string;

  @attribute()
  city: string;

  @attribute({defaultProvider: () => new Date()})
  createdOn: Date;

  @attribute()
  name: string;

  @attribute()
  state: string;

  @attribute()
  street: string;

  @attribute()
  street2: string;

  @attribute()
  zip: string;

  @attribute()
  phoneNumber: string;

  @attribute()
  specialInstructions: string;

  @attribute()
  weekendOkay: boolean;
}

export class UsersDao {

  public static create = _.once((): UsersDao => {
    return new UsersDao();
  });


  async createAddress(address: IUserAddress): Promise<IUserAddress> {
    if (address.addressId) {
      return Promise.reject('Address must not contain addressId for create');
    }
    return mapper.put(Object.assign(new AddressDdbEntity, address));
  }


  async getAddressesForUser(userId: string): Promise<IUserAddress[]> {
    const total = [];
    const iterator = mapper.query(AddressDdbEntity, {'userId': userId});
    for await (const address of iterator) {
      total.push(address);
    }
    return total;
  }


  async deleteAddress(userId: string, addressId: string): Promise<IUserAddress> {
    if (!userId) {
      return Promise.reject('Must provide userId');
    }
    if (!addressId) {
      return Promise.reject('Must provide addressId');
    }
    return mapper.delete(Object.assign(
      new AddressDdbEntity,
      {userId: userId, addressId: addressId}
    ));
  }

  async updateAddress(address: IUserAddress): Promise<IUserAddress> {
    if (!address.addressId) {
      return Promise.reject('Address must contain addressId for update');
    }
    return mapper.put(Object.assign(new AddressDdbEntity, address));
  }
}

