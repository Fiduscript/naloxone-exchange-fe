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

import { AccountType } from '../../../common/account-types';
import { CognitoConfig } from '../../../common/config/cognito';
import { FiduServiceBase } from '../common/fidu-service-base';
import { SuccessMessage } from '../common/message-response';
import { LOCATION } from '../util/window-injections';
import { PrivacyPolicy } from './model/privacy-policy';
import { UserAuthenticationData } from './model/user-authentication-data';
import { IUserConfirmation } from './model/user-confirmation';
import { UserInfo } from './model/user-info';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends FiduServiceBase {

  // We only allow OAuth login for consumer accounts, so we can leave this slightly hard-coded here for now
  private static readonly CONSUMER_COGNITO_CONFIG = CognitoConfig.getConfig(AccountType.Consumer);

  private static readonly COOKIE_EXPIRATION_DAYS: number = moment.duration(1, 'year').asDays();

  private static readonly COOKIE_STORAGE: CookieStorage = new CookieStorage({
    domain: window.location.hostname,
    secure: window.location.protocol === 'https:'
  });

  private static readonly DOMAIN = `${window.location.hostname}:${window.location.port}`;
  private static readonly NOT_LOGGED_IN: string = 'No valid user logged in.';

  private static oAuthOptions = {
    ClientId : AccountService.CONSUMER_COGNITO_CONFIG.appClientId,
    AppWebDomain : 'naloxone-exchange-customer-user-pool-test.auth.us-east-2.amazoncognito.com',
    TokenScopesArray : [],
    RedirectUriSignIn : `https://${AccountService.DOMAIN}/oauth/signin`,
    RedirectUriSignOut : `https://${AccountService.DOMAIN}/account/signout`,
    IdentityProvider : '',
    UserPoolId : AccountService.CONSUMER_COGNITO_CONFIG.userPoolId,
    AdvancedSecurityDataCollectionFlag : true,
    Storage: AccountService.COOKIE_STORAGE
  };

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
    const cognitoUser = this.createCognitoUser(confirmForm.username);

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

  public login(credentials: UserAuthenticationData): Observable<CognitoUserSession> {
    this.cookieService.set(
      'AccountType', credentials.AccountType.toString(), AccountService.COOKIE_EXPIRATION_DAYS,
      '/', null, window.location.protocol === 'https:');

    return this.createAuthenticateUserObservable(credentials)
        .pipe(this.logErrors());
  }

  public logout(): Observable<SuccessMessage> {
    return this.operateOnUser((user: CognitoUser) => {
      user.signOut();
      this.cookieService.delete('AccountType');
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
      this.getUserPool().signUp(
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
        this.createCognitoUser(credentials.Username) :
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

  private createCognitoUser(username: string): CognitoUser {
    return new CognitoUser({
      Username : username,
      Pool : this.getUserPool(),
      Storage: AccountService.COOKIE_STORAGE
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

    const user: CognitoUser = this.getUserPool().getCurrentUser();
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

  private getUserPool(): CognitoUserPool {
    const accountType: AccountType = Number(this.cookieService.get('AccountType'));
    const cognitoConfig: CognitoConfig = CognitoConfig.getConfig(accountType);

    return AccountService.createCognitoUserPool(cognitoConfig);
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

  private static createCognitoUserPool(config: CognitoConfig): CognitoUserPool {
    return new CognitoUserPool({
      UserPoolId : config.userPoolId,
      ClientId : config.appClientId,
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
