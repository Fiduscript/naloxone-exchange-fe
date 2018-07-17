import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ContactForm} from './model/contact-form';
import {Observable} from '../../../../node_modules/rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly key = '/api/contact';
  public constructor(private http: Http) { }

  /**
   * Forwards ContactUs message to us
   * @param contactForm
   */
  public contact(contactForm: ContactForm): Observable<string> {
    return this.http.post(this.key, contactForm).pipe(
      map((response: Response): string => response.text()));
  }
}
