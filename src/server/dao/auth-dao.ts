import * as _ from 'lodash';

import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

import { IUserCredentials } from '../../public/app/account/model/user-credentials';
import { ErrorMessage } from '../../public/app/common/message-response';
import { IUserSession } from '../model/user-session';
import { Logger } from '../util/logger';

const log = Logger.create(module);

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
    const authenticationDetails = new AuthenticationDetails({
        Username : user.username,
        Password : user.password
    });

    // TODO: this needs to come from configuration
    const userPool = new CognitoUserPool({
        UserPoolId : 'us-east-2_ej6SB5BPr', // This is the "customer-user-pool-test" user pool
        ClientId : '7dum3ivsqng75jdve4sc39tve4'
    });

    const cognitoUser = new CognitoUser({
        Username : user.username,
        Pool : userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          log.info("onSuccess called");
          // TODO: figure out what session information we should be storing
          const session: IUserSession = { userId: '0' };
          resolve(session);
        },

        onFailure: function(err) {
          log.info("onFailure called");
          reject(new ErrorMessage("Failure: " + err.message));
        },

        newPasswordRequired: function(userAttributes, requiredAttributes) {
          log.info("newPasswordRequired called")
          reject(new ErrorMessage("Password reset required but not yet implemented"))
        }
      });
    });
  }

  /**
   * Register new user.
   * TODO: Do we register with more than just basic user creds?
   * @param user
   * @return promise with user session information. At this time user UUID is sufficient.
   */
  public registerUser(user: IUserCredentials): Promise<IUserSession> {
    return Promise.reject(new ErrorMessage('Not Implemented.'));
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
