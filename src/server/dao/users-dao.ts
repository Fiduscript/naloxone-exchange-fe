import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk/clients/all';
import * as _ from 'lodash';
import { IUserAddress } from '../../public/app/account/model/user-address';
import { AWSProvider } from '../provider/aws-provider';

import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';

const uuidV4 = require('uuid/v4');
const TABLE_NAME = 'user_address_test_two';

@table(TABLE_NAME)
class AddressDdbEntity implements IUserAddress {

  @rangeKey({defaultProvider: () => uuidV4()})
  addressId: string;

  @attribute()
  city: string;

  @attribute({defaultProvider: () => new Date()})
  createdOn: Date;

  @attribute()
  name: string;

  @attribute()
  phoneNumber: string;

  @attribute()
  specialInstructions: string;

  @attribute()
  state: string;

  @attribute()
  street: string;

  @attribute()
  street2: string;

  @hashKey()
  userId: string;

  @attribute()
  weekendOkay: boolean;

  @attribute()
  zip: string;
}

export class UsersDao {

  public static create = _.once((): UsersDao => {
    return new UsersDao(new DataMapper({ client: AWSProvider.getDynamoClient() }));
  });

  private constructor( private mapper: DataMapper ) {
    // this.mapper = mapper;
  }


  async deleteAddress(userId: string, addressId: string): Promise<IUserAddress> {
    if (!userId) {
      return Promise.reject('Must provide userId');
    }
    if (!addressId) {
      return Promise.reject('Must provide addressId');
    }
    return this.mapper.delete(Object.assign(
      new AddressDdbEntity,
      {userId: userId, addressId: addressId}
    ));
  }


  async getAddressesForUser(userId: string): Promise<IUserAddress[]> {
    const total = [];
    const iterator = this.mapper.query(AddressDdbEntity, {'userId': userId});
    for await (const address of iterator) {
      total.push(address);
    }
    return total;
  }


  async saveAddress(address: IUserAddress): Promise<IUserAddress> {
    return this.mapper.put(Object.assign(new AddressDdbEntity, address));
  }
}
