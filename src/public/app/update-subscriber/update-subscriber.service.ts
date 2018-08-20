import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
  public subscribe(body: {[s: string]: string}): Observable<string> {
    return this.http.put<string>('/api/updates/subscribe', body);
  }

  /**
   * Subscribes a user by posting to `/api/updates/subscribe`.
   * @param email
   * @param state
   */
  public unsubscribe(body: {[s: string]: string}): Observable<string> {
    return this.http.put<string>('/api/updates/unsubscribe', body);
  }
}
