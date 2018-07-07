import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UpdateSubscriberService {

  constructor(private http: Http) { }

  /**
   * Subscribes a user by posting to `/api/updates/subscribe`.
   * @param email
   * @param state
   */
  public subscribe(body: {[s: string]: string}): Observable<string> {
    return this.http.put('/api/updates/subscribe', body)
        .map((response: Response): string => response.text());
  }

  /**
   * Subscribes a user by posting to `/api/updates/subscribe`.
   * @param email
   * @param state
   */
  public unsubscribe(body: {[s: string]: string}): Observable<string> {
    return this.http.put('/api/updates/unsubscribe', body)
        .map((response: Response): string => response.text());
  }
}
