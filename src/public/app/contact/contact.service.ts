import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ContactForm} from './model/contact-form';
import {Observable} from '../../../../node_modules/rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public constructor(private http: Http) { }
  readonly key = '/api/contact/dumb';

  /**
   * Subscribes a user by posting to `/api/updates/subscribe`.
   * @param email
   * @param state
   */
  // public saveContact(contactForm: ContactForm): Observable<string> {
  public saveContact(contactForm: ContactForm): string {
    // let responsse = this.http.get(this.key, contactForm)
    let responsse = this.http.get(this.key);
      // .map((response: Response): string => response.text());


    alert(JSON.stringify(responsse));
    alert("fuck!");
    return "booty";
    // Observable.
    // return resp  onse.map((response: Response): string => response.text())();
  }
}
