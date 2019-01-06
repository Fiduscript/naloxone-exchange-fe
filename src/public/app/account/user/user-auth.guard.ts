import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

  private readonly DEFAULT_EXPIRATION_MILLIS: number = 60 * 1000;

  public constructor(
      private cookieService: CookieService,
      private service: AccountService,
      private router: Router) {
  }

  /**
   * This method is meant to be used as a route auth guard.
   * If a user is not authorized to view the page they are redirected to the
   * login page but will be brought back to where they were attempting to visit.
   * @param route
   * @param state
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.service.currentSession().pipe(
      map((session?: CognitoUserSession): boolean => {
        const loggedIn: boolean = session != null && session.isValid();
        if (!loggedIn) {
          this.cookieService.set('LoginRedirectLocation', state.url, this.getReturnCookieExpiration(), '/');
          this.router.navigate(['/account/login']);
        }
        return loggedIn;
      })
    );
  }

  private getReturnCookieExpiration(): Date {
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + this.DEFAULT_EXPIRATION_MILLIS;
    now.setTime(expireTime);
    return now;
  }

}
