import { DataMapper } from '@aws/dynamodb-data-mapper';

import * as _ from 'lodash';
import { UserAddress } from '../../public/app/account/model/user-address';
import { AWSProvider } from '../provider/aws-provider';

import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';

const uuidV4 = require('uuid/v4');
const TABLE_NAME = 'user_address_test_two';

@table(TABLE_NAME)
export class UserAddressDdb extends UserAddress {

  @rangeKey({defaultProvider: () => uuidV4()})
  public addressId: string = undefined;

  @attribute()
  public city: string = undefined;

  @attribute({defaultProvider: () => new Date()})
  public createdOn?: Date = undefined;

  @attribute()
  public name: string = undefined;

  @attribute()
  public phoneNumber?: string = undefined;

  @attribute()
  public specialInstructions?: string = undefined;

  @attribute()
  public state: string = undefined;

  @attribute()
  public street: string = undefined;

  @attribute()
  public street2?: string = undefined;

  @hashKey()
  public userId: string = undefined;

  @attribute()
  public weekendOkay?: boolean = true;

  @attribute()
  public zip: string = undefined;

  public constructor(address: UserAddress = {} as UserAddress) {
    super(address);
  }
}


export class UsersDao {

  public static create = _.once((): UsersDao => {
    return new UsersDao(new DataMapper({ client: AWSProvider.getDynamoClient() }));
  });

  private constructor( private mapper: DataMapper ) {}

  async deleteAddress(userId: string, addressId: string): Promise<UserAddress> {
    if (!userId) {
      return Promise.reject('Must provide userId');
    }
    if (!addressId) {
      return Promise.reject('Must provide addressId');
    }
    return this.mapper.delete(Object.assign(
      new UserAddressDdb(),
      {userId: userId, addressId: addressId}
    ));
  }

  async getAddressesForUser(userId: string): Promise<UserAddress[]> {
    const total = [];
    const iterator = this.mapper.query(UserAddressDdb, {'userId': userId});
    for await (const address of iterator) {
      total.push(address);
    }
    return total;
  }

  async saveAddress(address: UserAddress): Promise<UserAddress> {
    // stupid ddb hack - null causes problems during serialization
    if (address.street2 == null) {
      address.street2 = '';
    }
    if (address.specialInstructions == null) {
      address.specialInstructions = '';
    }
    if (address.phoneNumber == null) {
      address.phoneNumber = '';
    }
    return this.mapper.put(Object.assign(new UserAddressDdb, address));
  }

}
