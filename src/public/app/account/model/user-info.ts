import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

@JsonObject
export class UserInfo {

  @JsonProperty('name', String)
  public readonly name: string = undefined;

  @JsonProperty('email', String)
  public readonly email: string = undefined;

  public constructor(name: string = '', email: string = '') {
    this.name = name;
    this.email = email;
  }

  public hasName(): boolean {
    return !_.isEmpty(this.name);
  }
}
