import * as _ from 'lodash';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

import { UserInfo } from '../../public/app/account/model/user-info';
import { ErrorMessage } from '../../public/app/common/message-response';
import { Logger } from '../util/logger';

const log = Logger.create(module);

// map of login id to UserInfo.
const USERS = {
};

export class UserAccountDao {

  private constructor() {

  }

  public static create = _.once((): UserAccountDao => {
    return new UserAccountDao();
  });

  /**
   * Gets user infomration for the login provided.
   * @param uuid
   */
  public getUser(session: CognitoUserSession): Promise<UserInfo> {
    const idTokenPayload = session.getIdToken().decodePayload();
    const userInfo = new UserInfo(idTokenPayload['name'], idTokenPayload['email']);

    return Promise.resolve(userInfo);
  }

  /**
   * Creates a user with the provided user information
   * @param userInfo
   */
  public createUser(userInfo: UserInfo): Promise<UserInfo> {
    if (USERS[userInfo.id] == null) {
      USERS[userInfo.id] = userInfo;
      return Promise.resolve(userInfo);
    }

    const msg: string = `Rejecting createUser: User \`${userInfo.id}\` already exists!`;
    return Promise.reject(new ErrorMessage(msg));
  }

  /**
   * Updates a user with the provided information
   * @param userInfo
   */
  public updateUserInfo(userInfo: UserInfo): Promise<UserInfo> {
    if (USERS[userInfo.id] != null) {
      USERS[userInfo.id] = userInfo;
      return Promise.resolve(userInfo);
    }

    const msg: string = `Rejecting updateUserInfo: No user \`${userInfo.id}\` to update.`;
    return Promise.reject(new ErrorMessage(msg));
  }

}
