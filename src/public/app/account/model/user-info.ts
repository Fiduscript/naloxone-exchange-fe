import { CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js';
import * as _ from 'lodash';

export interface IUserInfo {
  name: string;
  email: string;
  privacyAgreement: string;
}
export class UserInfo implements IUserInfo {
  private static CUSTOM_PROPS: Set<string> = new Set(['privacyAgreement']);

  public readonly name: string = '';
  public readonly email: string = '';
  public readonly privacyAgreement: string = 'v(-1)';

  public constructor(userInfo: IUserInfo = {} as IUserInfo) {
    _.merge(this, userInfo);
  }

  public static fromSession(session?: CognitoUserSession): UserInfo {
    if (session == null || !session.isValid()) {
      return new UserInfo();
    }
    return new UserInfo(session.getIdToken().decodePayload() as IUserInfo);
  }

  /**
   * Builds cognito attributes from this UserInfo object.
   */
  public cognitoAttributes(): CognitoUserAttribute[] {
    return _.map(this, (value: any, prop: string) => {
        const name = UserInfo.CUSTOM_PROPS.has(prop) ? `custom:${prop}` : prop;
        return new CognitoUserAttribute({Name: name, Value: value});
    });
  }

  /**
   * If an object has a name and an email address we consider someone authenticated.
   */
  public isAuthenticated(): boolean {
    return !(_.isEmpty(this.name) || _.isEmpty(this.email));
  }

}
