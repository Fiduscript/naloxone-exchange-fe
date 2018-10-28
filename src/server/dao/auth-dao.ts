import * as _ from 'lodash';

import { IUserCredentials } from '../../public/app/account/model/user-credentials';
import { UserInfo } from '../../public/app/account/model/user-info';
import { ErrorMessage } from '../../public/app/common/message-response';
import { IUserSession } from '../model/user-session';
import { Logger } from '../util/logger';

const log = Logger.create(module);

// XXX: This is only for testing at this time. Remove when cognito is integrated
const USERS_PASSWORD = {
  'test@test.com': {
    id: '0',
    pw: 'test'
  }
};

export class AuthDao {

  private constructor() { }

  /**
   * Singleton provider of auth dao.
   */
  public static create = _.once((): AuthDao => {
    return new AuthDao();
  });

  /**
   * login user.
   * @param user user credentials
   * @returns promise with user session information. At this time user UUID is sufficent.
   */
  public login(user: IUserCredentials): Promise<IUserSession> {
    const creds = USERS_PASSWORD[user.email];
    if (creds != null && creds.pw === user.password) {
      const result: IUserSession = { userId: creds.id };
      return Promise.resolve(result);
    }

    const msg: string = `Rejecting login: Username or password is incorrect!`;
    return Promise.reject(new ErrorMessage(msg));
  }

  /**
   * Register new user.
   * TODO: Do we register with more than just basic user creds?
   * @param user
   * @return promise with user session information. At this time user UUID is sufficient.
   */
  public registerUser(user: UserInfo): Promise<IUserSession> {
    const userUUID = Math.floor(Math.random() * 10000000).toString(25); // for testing purpose only
    if (!USERS_PASSWORD[user.email]) {
      USERS_PASSWORD[user.email] = {id: userUUID, pw: user.password};
      const result: IUserSession = { userId: userUUID };
      return Promise.resolve(result);
    }

    const msg: string = 'Rejecting register user: This email address is already in use.';
    return Promise.reject(new ErrorMessage(msg));

  }

  /**
   * Deactivates user / deletes their acccount?
   * TODO: Do we need this yet?
   * @param user
   * @return ??
   */
  public deactivateUser(user: IUserCredentials): Promise<any> {
    return Promise.reject(new ErrorMessage('Not Implemented.'));
  }

  /**
   * Changes user account.
   * TODO: Do we need more than basic user name and password? (uuid, verify password, etc)
   * @param user
   * @return ??
   */
  public changePassword(user: IUserCredentials): Promise<any> {
    return Promise.reject(new ErrorMessage('Not Implemented.'));
  }

}
