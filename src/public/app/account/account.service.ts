import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { FiduServiceBase } from '../common/fidu-service-base';
import { SuccessMessage } from '../common/message-response';
import { IUserCredentials } from './model/user-credentials';
import { UserInfo } from './model/user-info';

// XXX: consider renaming this service to UserAuthService
@Injectable({
  providedIn: 'root'
})
export class AccountService extends FiduServiceBase {

  public constructor(private http: HttpClient) {
    super();
  }

  public login(loginForm: IUserCredentials): Observable<SuccessMessage> {
    return this.http.post<SuccessMessage>('/api/account/login', loginForm).pipe(
      this.deserialize(SuccessMessage),
      this.logErrors()
    );
  }

  public logout(): Observable<SuccessMessage> {
    return this.http.delete<SuccessMessage>('/api/account/logout').pipe(
      this.deserialize(SuccessMessage),
      this.logErrors()
    );
  }

  public register(
      userCredentials: IUserCredentials,
      userInfo: UserInfo): Observable<SuccessMessage> {
    const body = { userCredentials, userInfo };
    return this.http.post<SuccessMessage>('/api/account/register', body);
  }

  public whoami(): Observable<UserInfo> {
    const key: string = '/api/account/whoami';
    if (this.hasMemo(key)) {
      return this.getMemoized(key);
    }

    return this.http.get<UserInfo>(key).pipe(
      this.deserialize(UserInfo),
      this.memoizeResult(key),
      this.logErrors()
    );
  }

}