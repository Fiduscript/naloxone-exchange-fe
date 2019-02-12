import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

export interface IAddress {
  city: string;
  name: string;
  state: string;
  street1: string;
  street2: string;
  zip: string;
}

@JsonObject
export class Address implements IAddress {

  @JsonProperty('city', String)
  city: string = '';

  @JsonProperty('name', String)
  name: string = '';

  @JsonProperty('state', String)
  state: string = '';

  @JsonProperty('street1', String)
  street1: string = '';

  @JsonProperty('street2', String)
  street2: string = '';

  @JsonProperty('zip', String)
  zip: string = '';

  constructor(address: IAddress) {
    _.merge(this, address);
  }
}
