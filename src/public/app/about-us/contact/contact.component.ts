import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
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
     (msg: string): void => {
       this.sentMsg = true;
     }, (error: Response): void => {
        this.contactForm.enable();
       alert(error.json().message);
     });
  }

}
