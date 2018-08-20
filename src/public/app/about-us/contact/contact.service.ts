import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IContactForm } from './model/contact-form';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly key = '/api/contact';
  public constructor(private http: HttpClient) { }

  /**
   * Forwards ContactUs message to us
   * @param contactForm
   */
  public contact(contactForm: IContactForm): Observable<string> {
    return this.http.post<string>(this.key, contactForm);
  }
}
