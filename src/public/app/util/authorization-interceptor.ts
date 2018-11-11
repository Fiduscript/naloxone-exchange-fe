import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError, map, mergeAll } from 'rxjs/operators';

import { AccountService } from '../account/account.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  public constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.accountService.currentSession().pipe(
      map((session: CognitoUserSession) => {
        const authToken = session.getIdToken().getJwtToken();
        const clonedRequest = req.clone({ setHeaders: { Authorization: authToken } });

        return next.handle(clonedRequest);
      }),
      catchError(err => of(next.handle(req))),
      mergeAll()
    );
  }

}
