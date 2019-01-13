import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FiduServiceBase } from '../../common/fidu-service-base';
import { SuccessMessage } from '../../common/message-response';
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
  public contact(contactForm: IContactForm): Observable<SuccessMessage> {
    const path: string = '/api/contact';
    return this.http.post<SuccessMessage>(path, contactForm).pipe(
        this.deserialize(SuccessMessage),
        this.logErrors()
      );
  }
}
