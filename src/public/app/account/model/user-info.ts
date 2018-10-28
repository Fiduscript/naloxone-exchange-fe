import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

import { IUserCredentials } from './user-credentials';

@JsonObject
export class UserInfo implements IUserCredentials {

  @JsonProperty('id', String, true)
  public readonly id?: string = undefined;

  @JsonProperty('firstName', String)
  public readonly firstName: string = undefined;

  @JsonProperty('lastName', String)
  public readonly lastName: string = undefined;

  @JsonProperty('email', String)
  public readonly email: string = undefined;

  @JsonProperty('password', String, true)
  public readonly password?: string = undefined;

  public constructor(attrs: UserInfo = <UserInfo>{}) {
    this.id = attrs.id;
    this.firstName = attrs.firstName || '';
    this.lastName = attrs.lastName || '';
    this.email = attrs.email || '';
    this.password = attrs.password;
  }

  public isValidUser(): boolean {
    return !_.isEmpty(this.id);
  }

  public withId(id: string): UserInfo {
    return new UserInfo(_.assignIn(this, {id: id}));
  }

}
