import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { UserInfo } from '../model/user-info';

@Injectable()
export class UserAuthGuard implements CanActivate {

  public constructor(
      private service: LoginService,
      private router: Router) {

  }

  /**
   * This method is meant to be used as a route auth guard.
   * It
   * @param route
   * @param state
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.service.whoami().pipe(
      map((user: UserInfo): boolean => {
        const loggedIn = user.hasName();
        if (!loggedIn) {
          this.router.navigate(['/account/login'],  { queryParams: { returnTo: state.url } });
        }
        return loggedIn;
      })
    );
  }

}
