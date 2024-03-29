import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CognitoAuth, CognitoAuthOptions } from 'amazon-cognito-auth-js';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute,
  CognitoUserPool, CognitoUserSession, CookieStorage, IAuthenticationDetailsData,
  ICognitoUserAttributeData, ISignUpResult } from 'amazon-cognito-identity-js';
import * as _ from 'lodash';
import { Moment } from 'moment';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { bindNodeCallback, MonoTypeOperatorFunction, Observable, ObservableInput, Observer, of, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';

import { FiduServiceBase } from '../common/fidu-service-base';
import { SuccessMessage } from '../common/message-response';
import { LOCATION } from '../util/window-injections';
import { PrivacyPolicy } from './model/privacy-policy';
import { IUserConfirmation } from './model/user-confirmation';
import { UserInfo } from './model/user-info';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends FiduServiceBase {

  private static readonly COGNITO_CLIENT_ID = '7dum3ivsqng75jdve4sc39tve4';
  private static readonly COGNITO_POOL_ID = 'us-east-2_ej6SB5BPr';

  private static readonly COOKIE_STORAGE: CookieStorage = new CookieStorage({
    domain: window.location.hostname,
    secure: window.location.protocol === 'https:'
  });

  private static readonly DOMAIN = `${window.location.hostname}:${window.location.port}`;
  private static readonly NOT_LOGGED_IN: string = 'No valid user logged in.';

  private static oAuthOptions = {
    ClientId : AccountService.COGNITO_CLIENT_ID,
    AppWebDomain : 'naloxone-exchange-customer-user-pool-test.auth.us-east-2.amazoncognito.com',
    TokenScopesArray : [],
    RedirectUriSignIn : `https://${AccountService.DOMAIN}/oauth/signin`,
    RedirectUriSignOut : `https://${AccountService.DOMAIN}/account/signout`,
    IdentityProvider : '',
    UserPoolId : AccountService.COGNITO_POOL_ID,
    AdvancedSecurityDataCollectionFlag : true,
    Storage: AccountService.COOKIE_STORAGE
  };

  // This is the "customer-user-pool-test" user pool
  // TODO: needs to be provided via config
  private static readonly  USER_POOL: CognitoUserPool = new CognitoUserPool({
    UserPoolId : AccountService.COGNITO_POOL_ID,
    ClientId : AccountService.COGNITO_CLIENT_ID,
    Storage: AccountService.COOKIE_STORAGE
  });

  public constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    @Inject(LOCATION) private location: Location) {
    super();
  }

  public authorizeOauth(location: string): Observable<SuccessMessage> {
    return Observable.create((observer) => {
      const auth = new CognitoAuth(AccountService.oAuthOptions);

      auth.userhandler = {
        onSuccess: () => {
          observer.next(new SuccessMessage('Successfully logged in'));
        },
        onFailure: (err) => observer.error(err),
      };

      auth.parseCognitoWebResponse(location);
    });
  }

  public authorizeSocial(provider: string): Observable<SuccessMessage> {
    return Observable.create((observer) => {
      if (provider === 'Facebook') {
        AccountService.oAuthOptions.IdentityProvider = provider;
      } else if (provider === 'Google') {
        AccountService.oAuthOptions.IdentityProvider = provider;
      } else {
        observer.error(new SuccessMessage('Unable to authenticate with provider'));
      }

      const auth = new CognitoAuth(AccountService.oAuthOptions);

      auth.userhandler = {
        onSuccess: () => observer.next(new SuccessMessage('Authenticating')),
        onFailure: (err) => observer.error(err),
      };

      auth.getSession();
    });
  }

  public confirmRegistration(confirmForm: IUserConfirmation): Observable<SuccessMessage> {
    const cognitoUser = AccountService.createCognitoUser(confirmForm.username);

    return Observable.create((observer: Observer<SuccessMessage>) => {
      cognitoUser.confirmRegistration(confirmForm.code, true, (err, result) => {
        if (err) {
          observer.error(err);
        }
        observer.next(new SuccessMessage('Successfully confirmed user!'));
      });
    }).pipe(this.logErrors());
  }

  public currentSession(): Observable<CognitoUserSession | null> {
    return this.operateOnUser((user: CognitoUser) => of(user.getSignInUserSession()))
      .pipe(
        this.defaultIfNotLoggedIn(),
        this.logErrors()
      );

  }

  public getPrivacyPolicy(): Observable<PrivacyPolicy> {
    const path: string = '/api/account/privacyPolicy';
    if (this.hasMemo(path)) {
      return this.getMemoized(path);
    }

    return this.http.get<PrivacyPolicy>(path).pipe(
      this.deserialize(PrivacyPolicy),
      this.memoizeResult(path),
      this.logErrors()
    );

  }

  public login(credentials: IAuthenticationDetailsData): Observable<CognitoUserSession> {
    return this.createAuthenticateUserObservable(credentials)
        .pipe(this.logErrors());
  }

  public logout(): Observable<SuccessMessage> {
    return this.operateOnUser((user: CognitoUser) => {
      user.signOut();
      return of(new SuccessMessage('Sucessfully logged out.'));
    }).pipe(
      this.defaultIfNotLoggedIn(new SuccessMessage('Already logged out.')),
      this.logErrors()
    );
  }

  public redirectUserOnLogin() {
    const returnRoute = this.cookieService.get('LoginRedirectLocation') || '/';
    this.cookieService.delete('LoginRedirectLocation', '/');
    this.location.replace(returnRoute);
  }

  public register(credentials: IAuthenticationDetailsData, userInfo: UserInfo): Observable<SuccessMessage> {
    return Observable.create((observer: Observer<SuccessMessage>) => {
      AccountService.USER_POOL.signUp(
          credentials.Username,
          credentials.Password,
          userInfo.cognitoUserAttributes(),
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
   * Updates a user password
   */
  public updatePassword(oldPassword: string, newPassword: string): Observable<SuccessMessage> {
    return this.operateOnUser((user: CognitoUser) => {
      return bindNodeCallback(user.changePassword)(oldPassword, newPassword).pipe(
        map((result: any) => new SuccessMessage(result as string))
      );
    }).pipe( this.logErrors() );
  }

  /**
   * Sets user's info to the supplied userInfo object.
   * @param userInfo
   */
  public updateUserInfo(
      attributes: ICognitoUserAttributeData[],
      credentials?: IAuthenticationDetailsData): Observable<SuccessMessage> {

    return this.operateOnUser((user: CognitoUser) => {
      const updateTask = bindNodeCallback(user.updateAttributes)(attributes).pipe(
        map((result: any) => new SuccessMessage(result as string))
      );

      if (credentials == null) {
        return updateTask;
      }

      // XXX: Validate a user's password before allowing them to change this attribute.
      //      Is this the correct way to do this?
      return this.createAuthenticateUserObservable(credentials, user)
          .pipe(flatMap((session: CognitoUserSession) => updateTask));
    });
  }

  /**
   * Shortcut to get user information from session data.
   */
  public whoami(): Observable <UserInfo> {
    const key: string = 'whoami';
    if (this.hasMemo(key)) {
      return this.getMemoized(key);
    }

    return this.operateOnUser((user: CognitoUser) => {
      return bindNodeCallback<CognitoUserAttribute[]>(user.getUserAttributes)().pipe(
          map((attrs: CognitoUserAttribute[]) => UserInfo.fromUserAttributes(attrs)),
          this.memoizeResult(key, _.partial(AccountService.expireTimeMapper, user))
        );
      }).pipe(
        this.defaultIfNotLoggedIn(new UserInfo()),
        this.logErrors()
    );
  }

  private createAuthenticateUserObservable(
      credentials: IAuthenticationDetailsData,
      cognitoUser?: CognitoUser): Observable<CognitoUserSession> {

    const user: CognitoUser = cognitoUser == null ?
        AccountService.createCognitoUser(credentials.Username) :
        cognitoUser;

    return Observable.create((observer) => {
      user.authenticateUser(new AuthenticationDetails(credentials), {
        onSuccess: (result: CognitoUserSession) => {
          observer.next(result);
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
    });
  }

  /**
   * Helper to be used with operateOnUser. If there is no valid user session this utility can provide a default value instead.
   * @param defaultValue
   */
  private defaultIfNotLoggedIn<T>(defaultValue: T = null): MonoTypeOperatorFunction<T> {
    return catchError( (error: any, caught: Observable<T>): ObservableInput<T> => {
      if (error === AccountService.NOT_LOGGED_IN) {
        return of(defaultValue);
      }
      throw error; // else propegate
    });
  }

  /**
   * Use this method to get a cognito user so that we reuse the same copy of it so that
   * session validation remains throughout the session.
   * NOTE: Generally if you are trying to operate on a User you should use the {@code operateOnUser} method.
   */
  private getCognitoUser(): Observable <CognitoUser | null> {
    const key: string = 'getCognitoUser';
    if (this.hasMemo(key)) {
      return this.getMemoized(key);
    }

    const user: CognitoUser = AccountService.USER_POOL.getCurrentUser();
    if (user == null) {
      return of(null);
    } else {
      // to be more efficent make sure we only bind once.
      user.changePassword = user.changePassword.bind(user);
      user.getUserAttributes = user.getUserAttributes.bind(user);
      user.updateAttributes = user.updateAttributes.bind(user);
      user.getSession = user.getSession.bind(user);
    }

    // We already have a 'user' but that doesn't mean that the user has a validated session,
    // so we will get a valid session and then return the user. This will set the session
    // attribute on the User object behind the scenes.
    return bindNodeCallback<CognitoUserSession>(user.getSession)().pipe(
      map((session: CognitoUserSession) => user),
      this.memoizeResult(key, AccountService.expireTimeMapper)
    );
  }

  /**
   * Helper method that handles operating on a user with a valid session.
   * @param operation operation to do with user object
   */
  private operateOnUser<T>(operation: (user: CognitoUser) => ObservableInput<T>): Observable<T> {
    return this.getCognitoUser().pipe(
      flatMap((user: CognitoUser): ObservableInput<T> => {
        if (user == null) {
          return throwError(AccountService.NOT_LOGGED_IN);
        }
        return operation(user);
      })
    );
  }

  private static createCognitoUser(username: string): CognitoUser {
    return new CognitoUser({
      Username : username,
      Pool : AccountService.USER_POOL,
      Storage: AccountService.COOKIE_STORAGE
    });
  }

  private static expireTimeMapper(user: CognitoUser): Moment {
    const session: CognitoUserSession = user.getSignInUserSession();
    if (session == null) { return null; }
    const expires = session.getAccessToken().getExpiration();
    return expires == null ? null : moment.unix(expires);
  }
}
