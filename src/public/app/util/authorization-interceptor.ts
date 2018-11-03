import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import { of } from 'rxjs';
import { AccountService } from '../account/account.service';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  public constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.accountService.currentSession().map((session: CognitoUserSession) => {
      const authToken = session.getIdToken().getJwtToken();
      const clonedRequest = req.clone({ setHeaders: { Authorization: authToken } });
      
      return next.handle(clonedRequest);
    }).catch(err => {
      return of(next.handle(req));
    }).mergeAll();
  }

}
