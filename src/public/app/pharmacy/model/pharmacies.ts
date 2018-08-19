import { JsonObject, JsonProperty } from 'json2typescript';

import { Pharmacy } from './pharmacy';

@JsonObject
export class Pharmacies {

  @JsonProperty('pharmacies', [Pharmacy])
  public readonly pharmacies: Pharmacy[] = [];

  public constructor(
      pharmacies: Pharmacy[] = []) {
    this.pharmacies = pharmacies;
  }

}
