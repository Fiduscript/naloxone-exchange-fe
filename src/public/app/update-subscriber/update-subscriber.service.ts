import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FiduServiceBase } from '../common/fidu-service-base';
import { MessageResponse } from '../common/message-response';

@Injectable({
  providedIn: 'root'
})
export class UpdateSubscriberService extends FiduServiceBase {

  public constructor(private http: HttpClient) {
    super();
   }

  /**
   * Subscribes a user by posting to `/api/updates/subscribe`.
   * @param email
   * @param state
   */
  public subscribe(body: {[s: string]: string}): Observable<MessageResponse> {
    const path: string = '/api/updates/subscribe';
    return this.http.put<MessageResponse>(path, body).pipe(
        this.logErrors()
      );
  }

  /**
   * Subscribes a user by posting to `/api/updates/subscribe`.
   * @param email
   * @param state
   */
  public unsubscribe(body: {[s: string]: string}): Observable<MessageResponse> {
    const path: string = '/api/updates/unsubscribe';
    return this.http.put<MessageResponse>(path, body).pipe(
        this.logErrors()
      );
  }
}
