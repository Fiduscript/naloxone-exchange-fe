import {JsonObject, JsonProperty} from 'json2typescript';

export interface IUserAddress {
  addressId?: string;
  userId: string;
  name: string;
  street: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber?: string;
  specialInstructions?: string;
  weekendOkay?: boolean;
}

@JsonObject("UserAddress")
export class UserAddress implements IUserAddress {

  @JsonProperty('addressId', String, true)
  public addressId: string = undefined;

  @JsonProperty('userId', String, true)
  public userId: string = undefined;

  @JsonProperty('name', String, true)
  public name: string = undefined;

  @JsonProperty('street', String, true)
  public street: string = undefined;

  @JsonProperty('street2', String, true)
  public street2?: string = undefined;

  @JsonProperty('city', String, true)
  public city: string = undefined;

  @JsonProperty('state', String, true)
  public state: string = undefined;

  @JsonProperty('zip', String, true)
  public zip: string = undefined;

  @JsonProperty('phoneNumber', String, true)
  public phoneNumber?: string = undefined;

  @JsonProperty('specialInstructions', String, true)
  public specialInstructions?: string = undefined;

  @JsonProperty('weekendOkay', Boolean, true)
  public weekendOkay?: boolean = true;

  public constructor() {
  }
}
