import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

@JsonObject
export class UserInfo {

  @JsonProperty('id', String, true)
  public id: string = undefined;

  @JsonProperty('firstName', String)
  public readonly firstName: string = undefined;

  @JsonProperty('lastName', String)
  public readonly lastName: string = undefined;

  @JsonProperty('email', String)
  public readonly email: string = undefined;

  public constructor(firstName: string = '', lastName: string = '', email: string = '') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  public static fromIDToken(idToken: Object): UserInfo {
    return new UserInfo(idToken['name'], '', idToken['email']);
  }

  public hasName(): boolean {
    return !_.isEmpty(this.firstName);
  }
}
