import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

  public constructor(
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
          this.router.navigate(['/account/login'],  { queryParams: { returnTo: state.url } });
        }
        return loggedIn;
      })
    );
  }

}
