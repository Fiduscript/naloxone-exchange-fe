import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { FiduServiceBase } from '../common/fidu-service-base';
import { SuccessMessage } from '../common/message-response';
import { IUserCredentials } from './model/user-credentials';
import { UserInfo } from './model/user-info';

import { AuthenticationDetails, CognitoUser, CognitoUserSession, CognitoUserPool, CookieStorage } from 'amazon-cognito-identity-js';

// XXX: consider renaming this service to UserAuthService
@Injectable({
  providedIn: 'root'
})
export class AccountService extends FiduServiceBase {

  cookieStorage = new CookieStorage({
    domain: window.location.hostname,
    secure: window.location.protocol === "https:"
  });

  // This is the "customer-user-pool-test" user pool
  // TODO: needs to be provided via config
  userPool = new CognitoUserPool({
    UserPoolId : 'us-east-2_ej6SB5BPr',
    ClientId : '7dum3ivsqng75jdve4sc39tve4',
    Storage: this.cookieStorage
  });

  public constructor(private http: HttpClient) {
    super();
  }

  public login(loginForm: IUserCredentials): Observable<SuccessMessage> {
    const authenticationDetails = new AuthenticationDetails({
        Username : loginForm.username,
        Password : loginForm.password
    });

    const cognitoUser = new CognitoUser({
        Username : loginForm.username,
        Pool : this.userPool,
        Storage: this.cookieStorage
    });

    return Observable.create((observer) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          observer.next(new SuccessMessage('Successfully logged in'));
        },

        onFailure: (err) => {
          observer.error(new Error("Failure: " + err.message));
        },

        newPasswordRequired: (userAttributes, requiredAttributes) => {
          observer.error(new Error("Password reset required but not yet implemented"));
        }
      });
    });
  }

  public logout(): Observable<SuccessMessage> {
    const user = this.userPool.getCurrentUser();

    return Observable.create((observer) => {
      if (user != null) {
        user.signOut();
        observer.next(new SuccessMessage('Sucessfully logged out.'));
      } else {
        observer.next(new SuccessMessage('Already logged out.'));
      }
    });
  }

  public register(
      userCredentials: IUserCredentials,
      userInfo: UserInfo): Observable<SuccessMessage> {
    const body = { userCredentials, userInfo };
    return this.http.post<SuccessMessage>('/api/account/register', body);
  }

  public currentSession(): Observable<CognitoUserSession> {
    const user = this.userPool.getCurrentUser();

    return Observable.create((observer) => {
      if (user == null) {
        observer.error("There is no logged-in user");
      } else {
        user.getSession(function(err, session) {
          if (session != null) {
            observer.next(session);
          } else {
            observer.error("Couldn't get active session");
          }
        });
      }
    });
  }

  public whoami(): Observable<UserInfo> {
    const user = this.userPool.getCurrentUser();

    return Observable.create((observer) => {
      if (user == null) {
        observer.next(new UserInfo());
      } else {
        user.getSession(function(err, session) {
          if (session != null) {
            const userIdPayload = session.getIdToken().decodePayload();
            observer.next(UserInfo.fromIDToken(userIdPayload));
          } else {
            console.log("Couldn't get current session: " + err);
            observer.next(new UserInfo());
          }
        });
      }
    });
  }

}
