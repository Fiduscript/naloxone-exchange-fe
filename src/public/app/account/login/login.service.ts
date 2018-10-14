import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { jsonConvert } from '../../util/json-convert-provider';
import { UserInfo } from '../model/userInfo';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  // private readonly key = '/api/account/login';
  private readonly memo: {[s: string]: any} = {};


  constructor(private http: HttpClient) {
    this.memoize = this.memoize.bind(this);
    this.whoami = this.whoami.bind(this);
   }

  public login(loginForm: Object): Observable<object> {
    return this.http.post<object>('/api/account/login', loginForm).pipe(
      tap(() => window.location.replace('/'))
    );
  }

  public whoami(): Observable<UserInfo> {
    const key: string = '/api/account/whoami';
    if (this.memo[key] != null) {
      return this.memo[key];
    }
    return this.http.get<UserInfo>(key).pipe(
      map(this.mapUser),
      tap(_.partial(this.memoize, key)),
    );
  }

  private memoize(key: string, memo: any): void {
    this.memo[key] = memo;
  }

  private mapUser(user: UserInfo): UserInfo {
    return jsonConvert.deserialize(user, UserInfo);
  }

}
