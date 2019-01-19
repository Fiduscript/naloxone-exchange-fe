import { CognitoUserAttribute, CognitoUserSession, ICognitoUserAttributeData } from 'amazon-cognito-identity-js';
import * as _ from 'lodash';

import { safeMerge } from '../../../../common/safe-merge';

export interface IUserInfo {
  email: string;
  name: string;
  privacyAgreement: string;
  subscriptionSetting: String;
}
export class UserInfo implements IUserInfo {
  private static CUSTOM_PREFIX: String = 'custom:';
  private static CUSTOM_PREFIX_MATCHER: RegExp = /^custom\:/;
  private static CUSTOM_PROPS: Set<string> = new Set(['privacyAgreement', 'subscriptionSetting']);

  public readonly email: string = '';
  public readonly id?: string = null;
  public readonly name: string = '';
  public readonly privacyAgreement: string = 'v(-1)';
  public readonly subscriptionSetting: string = 'all';

  public constructor(userInfo: IUserInfo = {} as IUserInfo) {
    safeMerge(this, userInfo);

    // set additional attributes only if provided.
    if (userInfo['cognito:username'] != null) {
      this.id = userInfo['cognito:username'];
    } else if (userInfo['sub'] != null) {
      this.id = userInfo['sub'];
    }
  }

  /**
   * Builds cognito attributes from this UserInfo object.
   */
  public cognitoUserAttributeData(): ICognitoUserAttributeData[] {
    return _.map(this, (value: any, prop: string) => {
        const name = UserInfo.CUSTOM_PROPS.has(prop) ? `${UserInfo.CUSTOM_PREFIX}${prop}` : prop;
        return {Name: name, Value: value};
    });
  }

  public cognitoUserAttributes(): CognitoUserAttribute[] {
    return _.map(this.cognitoUserAttributeData(), (d) => new CognitoUserAttribute(d));
  }

  /**
   * If an object has a name and an email address we consider someone authenticated.
   */
  public isAuthenticated(): boolean {
    return !(_.isEmpty(this.name) || _.isEmpty(this.email));
  }

  public static fromSession(session?: CognitoUserSession): UserInfo {
    if (session == null || !session.isValid()) {
      return new UserInfo();
    }
    return new UserInfo(session.getIdToken().decodePayload() as IUserInfo);
  }

  public static fromUserAttributes(attributes: CognitoUserAttribute[]): UserInfo {
    const attrs: IUserInfo = _(attributes)
        .mapKeys((v) => _.replace(v.getName(), UserInfo.CUSTOM_PREFIX_MATCHER, ''))
        .mapValues((v) => v.getValue())
        .value();

    return new UserInfo(attrs);
  }

}
