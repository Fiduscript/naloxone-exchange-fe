import * as _ from 'lodash';

import { UserInfo } from '../../public/app/account/model/user-info';
import { ErrorMessage } from '../../public/app/common/message-response';
import { Logger } from '../util/logger';

const log = Logger.create(module);

// map of login id to UserInfo.
const USERS = {
  '0': {id: '0', firstName: 'Test', lastName: 'User', email: 'test@test.com'},
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
  public getUser(uuid: string): Promise<UserInfo> {
    if (USERS[uuid] != null) {
      return Promise.resolve(USERS[uuid]);
    }

    const msg: string = `Rejecting getUser: User \`${uuid}\` doesn't exist!`;
    return Promise.reject(new ErrorMessage(msg));
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
