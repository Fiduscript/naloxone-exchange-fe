import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

import { HttpErrorResponse } from '@angular/common/http';
import { compareValidator, strongPassword } from '../../../../common/validator/validator';
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
      confirmEmail: ['', [Validators.required, compareValidator('email')]],
      password: ['', [
        Validators.required,
        strongPassword()
        ]
      ],
      confirmPassword: ['', [Validators.required, compareValidator('password')]]
    });
  }

  ngOnInit() { }

  public register(): void {
    // TODO: register the user and login
    if (this.registerForm.invalid) {
      console.log('invalid form for registration');
      return;
    }

    const userCreds: IUserCredentials = {
      username: this.registerForm.get('email').value,
      confirmUsername: this.registerForm.get('confirmEmail').value,
      password: this.registerForm.get('password').value,
      confirmPassword: this.registerForm.get('confirmPassword').value,
    };

    const userInfo: UserInfo = new UserInfo(
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value,
        this.registerForm.get('email').value);

    this.service.register(userCreds, userInfo).subscribe(
      (): void => { window.location.replace('/account/login'); },
      (error: HttpErrorResponse): void => {
        this.error = error.error.message;
      }
    );
  }
}
