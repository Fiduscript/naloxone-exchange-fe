import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

@JsonObject
export class UserInfo {

  @JsonProperty('name', String)
  public readonly name: string = undefined;

  @JsonProperty('address', String)
  public readonly address: string = undefined;

  public constructor(name: string = '', address: string = '') {
    this.name = name;
    this.address = address;
  }

  public hasName(): boolean {
    return !_.isEmpty(this.name);
  }
}
