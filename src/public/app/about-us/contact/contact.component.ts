import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessage, SuccessMessage } from '../../common/message-response';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
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
      'name' : [null, [Validators.required, Validators.maxLength(200)]],
      'email' : [null, [Validators.required, Validators.email, Validators.maxLength(200)]],
      'message' : [null, [Validators.required, Validators.maxLength(4000)]],
    });
  }

  public ngOnInit() { }

  public reset(): void {
    this.contactForm.reset();
    this.contactForm.enable();
    this.sentMsg = false;
  }

  public submitContactUsForm(form: any) {
    this.contactForm.disable();
    this.service.contact(form).subscribe(
     (response: SuccessMessage): void => {
       this.sentMsg = true;
     }, (error: ErrorMessage): void => {
       alert(error.message);
       this.contactForm.enable();
     });
  }

}
