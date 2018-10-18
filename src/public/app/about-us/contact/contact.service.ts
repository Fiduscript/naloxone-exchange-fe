import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FiduServiceBase } from '../../common/fidu-service-base';
import { IContactForm } from './model/contact-form';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends FiduServiceBase {

  public constructor(private http: HttpClient) {
    super();
  }

  /**
   * Forwards ContactUs message to us
   * @param contactForm
   */
  public contact(contactForm: IContactForm): Observable<string> {
    const path: string = '/api/contact';
    return this.http.post<string>(path, contactForm).pipe(
        this.logErrors()
      );
  }
}
