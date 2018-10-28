import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

import { HttpErrorResponse } from '@angular/common/http';
import { MatchValidator } from 'src/common/validator/match-validator';
import { StrongPasswordValidator } from 'src/common/validator/strong-password-validator';
import { IUserCredentials } from '../model/user-credentials';
import { UserInfo } from '../model/user-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public error: string = null;

  constructor(
      private fb: FormBuilder,
      private service: AccountService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, new MatchValidator('email')]],
      password: ['', [new StrongPasswordValidator()]],
      confirmPassword: ['', [Validators.required, new MatchValidator('password')]]
    });
  }

  ngOnInit() { }

  public register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const userInfo: UserInfo = new UserInfo(<UserInfo> {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    });

    this.service.register(userInfo).subscribe(
      (): void => { window.location.replace('/account/login'); },
      (error: HttpErrorResponse): void => {
        this.error = error.error.message;
      }
    );
  }
}
