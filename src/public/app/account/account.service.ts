import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool,
    CognitoUserSession, CookieStorage, ISignUpResult } from 'amazon-cognito-identity-js';
import * as _ from 'lodash';
import { bindNodeCallback, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { FiduServiceBase } from '../common/fidu-service-base';
import { SuccessMessage } from '../common/message-response';
import { IUserConfirmation } from './model/user-confirmation';
import { IUserCredentials } from './model/user-credentials';
import { UserInfo } from './model/user-info';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends FiduServiceBase {

  private static readonly cookieStorage = new CookieStorage({
    domain: window.location.hostname,
    secure: window.location.protocol === 'https:'
  });

  // This is the "customer-user-pool-test" user pool
  // TODO: needs to be provided via config
  private static readonly userPool = new CognitoUserPool({
    UserPoolId : 'us-east-2_ej6SB5BPr',
    ClientId : '7dum3ivsqng75jdve4sc39tve4',
    Storage: AccountService.cookieStorage
  });

  public constructor(private http: HttpClient) {
    super();
  }

  public confirmRegistration(confirmForm: IUserConfirmation): Observable<SuccessMessage> {
    const cognitoUser = this.createCognitoUser(confirmForm.username);

    return Observable.create((observer) => {
      cognitoUser.confirmRegistration(confirmForm.code, true, (err, result) => {
        if (err) {
          observer.error(err);
        }
        observer.next(new SuccessMessage('Successfully confirmed user!'));
      });
    }).pipe(this.logErrors());
  }

  public currentSession(): Observable<CognitoUserSession | null> {
    const user: CognitoUser = AccountService.userPool.getCurrentUser();
    if (user == null) { return of(null); }
    return bindNodeCallback<CognitoUserSession>(user.getSession.bind(user))().pipe(
      this.logErrors()
    );
  }

  public login(loginForm: IUserCredentials): Observable<SuccessMessage> {
    const authenticationDetails = new AuthenticationDetails({
        Username : loginForm.username,
        Password : loginForm.password
    });

    const cognitoUser = this.createCognitoUser(loginForm.username);

    return Observable.create((observer) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          observer.next(new SuccessMessage('Successfully logged in'));
        },

        onFailure: (err) => {
          observer.error(err);
        },

        newPasswordRequired: (userAttributes, requiredAttributes) => {
          observer.error(new Error('Password reset required but not yet implemented'));
        },

        mfaRequired: (challengeName, challengeParameters) => {
          observer.error(new Error('MFA required but not yet implemented'));
        },

        totpRequired: (challengeName, challengeParameters) => {
          observer.error(new Error('TOTP required but not yet implemented'));
        },

        mfaSetup: (challengeName, challengeParameters) => {
          observer.error(new Error('MFA setup required but not yet implemented'));
        },

        selectMFAType: (challengeName, challengeParameters) => {
          observer.error(new Error('Select MFA type required but not yet implemented'));
        }
      });
    }).pipe(this.logErrors());
  }

  public logout(): Observable<SuccessMessage> {
    const user = AccountService.userPool.getCurrentUser();
    let message: string;

    if (user == null) {
      message = 'Already logged out.';
    } else {
      user.signOut();
      message = 'Sucessfully logged out.';
    }

    return of(new SuccessMessage(message));
  }

  public register(credentials: IUserCredentials, userInfo: UserInfo): Observable<SuccessMessage> {
    return Observable.create((observer) => {
      AccountService.userPool.signUp(
          credentials.username,
          credentials.password,
          userInfo.cognitoAttributes(),
          null,
          (err: Error, result: ISignUpResult) => {
        if (err) {
          observer.error(err);
        }

        observer.next(new SuccessMessage('Successfully registered user!'));
      });
    }).pipe( this.logErrors() );
  }

  /**
   * Shortcut to get user information from session data.
   */
  public whoami(): Observable<UserInfo> {
    return this.currentSession().pipe(
      map((session?: CognitoUserSession) => UserInfo.fromSession(session))
    );
  }

  private createCognitoUser(username: string): CognitoUser {
    return new CognitoUser({
      Username : username,
      Pool : AccountService.userPool,
      Storage: AccountService.cookieStorage
    });
  }
}
