import {JsonObject, JsonProperty} from 'json2typescript';
import * as _ from 'lodash';
import {Moment} from 'moment';
import {MomentConverter} from '../../util/moment-utils';

export interface IUserAddress {
  addressId?: string;
  city: string;
  createdOn?: Moment | Date;
  name: string;
  phoneNumber?: string;
  specialInstructions?: string;
  state: string;
  street: string;
  street2?: string;
  userId: string;
  weekendOkay?: boolean;
  zip: string;
}

@JsonObject('UserAddress')
export class UserAddress implements IUserAddress {

  @JsonProperty('addressId', String, true)
  public addressId: string = undefined;

  @JsonProperty('city', String, true)
  public city: string = undefined;

  @JsonProperty('createdOn', MomentConverter)
  public createdOn?: Moment = undefined;

  @JsonProperty('name', String, true)
  public name: string = undefined;

  @JsonProperty('phoneNumber', String, true)
  public phoneNumber?: string = undefined;

  @JsonProperty('specialInstructions', String, true)
  public specialInstructions?: string = undefined;

  @JsonProperty('state', String, true)
  public state: string = undefined;

  @JsonProperty('street', String, true)
  public street: string = undefined;

  @JsonProperty('street2', String, true)
  public street2?: string = undefined;

  @JsonProperty('userId', String, true)
  public userId: string = undefined;

  @JsonProperty('weekendOkay', Boolean, true)
  public weekendOkay?: boolean = true;

  @JsonProperty('zip', String, true)
  public zip: string = undefined;

  public constructor(address: IUserAddress = {} as IUserAddress) {
    _.merge(this, address);
  }
}
