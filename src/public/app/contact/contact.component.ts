import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from './contact.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-contact', // is this needed?
  templateUrl: './contact.component.pug'
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  public sentMsg: boolean;

  public constructor(
      private fb: FormBuilder,
      private service: ContactService) {
    this.sentMsg = false;
   this.contactForm = fb.group({
    'name' : [null, Validators.required],
    'email' : [null, [Validators.required, Validators.email]],
    'message' : [null, Validators.required],
   });
  }

  public ngOnInit() { }

  public submitContactUsForm(form: any) {
    this.service.contact(form).subscribe(
     (msg: string): void => {
       this.sentMsg = true;
     }, (error: Response): void => {
       alert(error.json().message);
     });

  }
}
