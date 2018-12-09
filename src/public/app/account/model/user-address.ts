import {IState} from '../../../../common/constant/states';
import {JsonObject, JsonProperty} from 'json2typescript';

export interface IUserAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

@JsonObject()
export class UserAddress implements IUserAddress {

  public constructor() {}

  @JsonProperty('name', String)
  public readonly name: string = undefined;

  @JsonProperty('street', String)
  public readonly street: string = undefined;

  @JsonProperty('city', String)
  public readonly city: string = undefined;

  @JsonProperty('state', String)
  public readonly state: string = undefined;

  @JsonProperty('zip', String)
  public readonly zip: string = undefined;
}

