import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { FiduServiceBase } from '../../common/fidu-service-base';
import { SuccessMessage } from '../../common/message-response';
import { jsonConvert } from '../../util/json-convert-provider';
import { ILoginForm } from '../model/login-form';
import { UserInfo } from '../model/user-info';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends FiduServiceBase {

  public constructor(private http: HttpClient) {
    super();
   }

  public login(loginForm: ILoginForm): Observable<SuccessMessage> {
    return this.http.post<SuccessMessage>('/api/account/login', loginForm);
  }

  public whoami(): Observable<UserInfo> {
    const key: string = '/api/account/whoami';
    if (this.hasMemo(key)) {
      return this.getMemoized(key);
    }

    return this.http.get<UserInfo>(key).pipe(
      this.deserialize(UserInfo),
      this.memoizeResult(key)
    );
  }

}
