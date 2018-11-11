import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute,
  CognitoUserPool, CognitoUserSession, CookieStorage } from 'amazon-cognito-identity-js';
import * as _ from 'lodash';
import { bindNodeCallback, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { FiduServiceBase } from '../common/fidu-service-base';
import { SuccessMessage } from '../common/message-response';
import { IUserConfirmation } from './model/user-confirmation';
import { IUserCredentials } from './model/user-credentials';
import { UserInfo } from './model/user-info';

// XXX: consider renaming this service to UserAuthService
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

  public register(
      userCredentials: IUserCredentials,
      userInfo: UserInfo): Observable<SuccessMessage> {

    const attributes = [
      new CognitoUserAttribute({
        Name: 'name',
        Value: userInfo.firstName
      }),
      new CognitoUserAttribute({
        Name: 'email',
        Value: userInfo.email
      })
    ];

    return Observable.create((observer) => {
      AccountService.userPool.signUp(userCredentials.username, userCredentials.password, attributes, null, (err, result) => {
        if (err) {
          observer.error(err);
        }

        observer.next(new SuccessMessage('Successfully registered user!'));
      });
    }).pipe(this.logErrors());
  }

  public confirm(confirmForm: IUserConfirmation): Observable<SuccessMessage> {
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

  public currentSession(): Observable<CognitoUserSession> {
    const user: CognitoUser = AccountService.userPool.getCurrentUser();

    if (user == null) {
      return throwError('There is no logged-in user');
    }

    return bindNodeCallback(user.getSession.bind(user))().pipe(
      map((session: any) => session),
      this.logErrors()
    );
  }

  public whoami(): Observable<UserInfo> {
    return this.currentSession().pipe(
      map((session) => {
        if (session == null) { return new UserInfo(); }
        const userIdPayload = session.getIdToken().decodePayload();
        return new UserInfo(userIdPayload['name'], '', userIdPayload['email']);
      }),
      catchError((error) => of(new UserInfo()))
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
