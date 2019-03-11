import * as _ from 'lodash';

export class UserAddress {

  public addressId: string = undefined;

  public city: string = undefined;

  public createdOn?: Date = undefined;

  public name: string = undefined;

  public phoneNumber?: string = undefined;

  public specialInstructions?: string = undefined;

  public state: string = undefined;

  public street: string = undefined;

  public street2?: string = undefined;

  public userId: string = undefined;

  public weekendOkay?: boolean = true;

  public zip: string = undefined;

  public constructor(address: UserAddress = {} as UserAddress) {
    _.merge(this, address);
  }
}
