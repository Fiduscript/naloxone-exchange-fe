import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.pug',
  styleUrls: ['./confirm.component.styl']
})
export class ConfirmComponent implements OnInit {

  public confirmForm: FormGroup;
  public error: string = null;

  public constructor(
      private fb: FormBuilder,
      private router: Router,
      private service: AccountService) {
    this.confirmForm = this.fb.group({
      username: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  ngOnInit() { }

  public confirm(): void {
    if (this.confirmForm.invalid) {
      return;
    }

    this.service.confirm(this.confirmForm.value).subscribe(
      (): void => { this.router.navigate(['/account/login']); },
      (error: Error): void => {
        this.error = error.message;
      }
    );
  }

}
