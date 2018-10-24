import * as _ from 'lodash';

import { UserInfo } from '../../public/app/account/model/user-info';
import { ErrorMessage } from '../../public/app/common/message-response';
import { Logger } from '../util/logger';

const log = Logger.create(module);

// map of login (email) to UserInfo.
const USERS = {
  'test@test.com': {
    name: 'Test User',
    password: 'test',
    email: 'test@test.com'
  }
};

// map of login (email) to user to Timer which expries the login
const loggedInUsers: {[user: string]: NodeJS.Timer} = { };

export class UserAccountDao {

  private constructor() {

  }

  public static create = _.once((): UserAccountDao => {
    return new UserAccountDao();
  });

  /**
   * Gets user infomration for the login provided.
   * @param login
   */
  public getUser(login: string): Promise<UserInfo> {
    if (USERS[login] != null) {
      return Promise.resolve(USERS[login]);
    }
    const msg: string = `Rejecting getUser: User \`${login}\` doesn't exist!`;
    return Promise.reject(new ErrorMessage(msg));
  }

  /**
   * Creates a user with the provided user information
   * @param userInfo
   */
  public createUser(userInfo: UserInfo): Promise<UserInfo> {
    const login: string = userInfo.email;
    if (USERS[login] == null) {
      USERS[login] = userInfo;
      return Promise.resolve(userInfo);
    }
    const msg: string = `Rejecting createUser: User \`${login}\` already exists!`;
    return Promise.reject(new ErrorMessage(msg));
  }

  /**
   * Updates a user with the provided information
   * @param userInfo
   */
  public updateUserInfo(userInfo: UserInfo): Promise<UserInfo> {
    const login: string = userInfo.email;
    if (USERS[login] != null) {
      USERS[login] = userInfo;
      return Promise.resolve(userInfo);
    }
    const msg: string = `Rejecting updateUserInfo: No user \`${login}\` to update.`;
    return Promise.reject(new ErrorMessage(msg));
  }

}
