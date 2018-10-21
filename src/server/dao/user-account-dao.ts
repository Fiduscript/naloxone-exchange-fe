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
    log.info('here');
    if (USERS[login] != null) {
      log.info('here2');
      return Promise.resolve(USERS[login]);
    }
    log.info('here3');
    const msg: string = `User ${login} already exists!`;
    log.warn(`Rejecting getUser. ${msg}`);
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
    const msg: string = `User ${login} already exists!`;
    log.warn(`Rejecting createUser. ${msg}`);
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
    const msg: string = `No user ${login} to update.`;
    log.warn(`Rejecting updateUserInfo. ${msg}`, userInfo);
    return Promise.reject(new ErrorMessage(msg));
  }

}
