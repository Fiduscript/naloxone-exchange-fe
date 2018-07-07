import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from './contact.service';

@Component({
  selector: 'app-contact', // is this needed?
  templateUrl: './contact.component.pug'
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;

  public constructor(
      private fb: FormBuilder,
      private service: ContactService) {
   this.contactForm = fb.group({
    'name' : [null, Validators.required],
    'email' : [null, Validators.required, Validators.email],
    'message' : [null, Validators.required],
   });
  }

  public ngOnInit() { }

  public submitContactUsForm(form: any) {
    // this.service.saveContact(form)
    alert(JSON.stringify(form));
  }
}
