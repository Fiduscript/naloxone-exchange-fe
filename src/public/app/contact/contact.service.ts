import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ContactForm} from './model/contact-form';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public constructor(private http: Http) { }
  public saveContact(contactForm: ContactForm): boolean { // todo change return type?
    const key = '/api/contact';
    this.http.post(key, contactForm); // TODO
    return true;
  }

}
