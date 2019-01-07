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

@JsonObject()
export class UserAddress implements IUserAddress {

  public constructor() {
  }

  @JsonProperty('addressId', String)
  public readonly addressId: string = undefined;

  @JsonProperty('userId', String)
  public readonly userId: string = undefined;

  @JsonProperty('name', String)
  public readonly name: string = undefined;

  @JsonProperty('street', String)
  public readonly street: string = undefined;

  @JsonProperty('street2', String)
  public readonly street2: string = undefined;

  @JsonProperty('city', String)
  public readonly city: string = undefined;

  @JsonProperty('state', String)
  public readonly state: string = undefined;

  @JsonProperty('zip', String)
  public readonly zip: string = undefined;

  @JsonProperty('phoneNumber', String)
  public readonly phoneNumber: string = undefined;

  @JsonProperty('specialInstructions', String)
  public readonly specialInstructions: string = undefined;

  @JsonProperty('weekendOkay', String)
  public readonly weekendOkay: boolean = true;
}

