import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MessageResponse } from '../common/message-response';

@Injectable({
  providedIn: 'root'
})
export class UpdateSubscriberService {

  constructor(private http: HttpClient) { }

  /**
   * Subscribes a user by posting to `/api/updates/subscribe`.
   * @param email
   * @param state
   */
  public subscribe(body: {[s: string]: string}): Observable<MessageResponse> {
    return this.http.put<MessageResponse>('/api/updates/subscribe', body);
  }

  /**
   * Subscribes a user by posting to `/api/updates/subscribe`.
   * @param email
   * @param state
   */
  public unsubscribe(body: {[s: string]: string}): Observable<MessageResponse> {
    return this.http.put<MessageResponse>('/api/updates/unsubscribe', body);
  }
}
