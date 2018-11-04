import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

import { MatchValidator } from 'src/common/validator/match-validator';
import { StrongPasswordValidator } from 'src/common/validator/strong-password-validator';
import { LOCATION } from '../../util/window-injections';
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
      @Inject(LOCATION) private location: Location,
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

    const userCreds: IUserCredentials = {
      username: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      confirmPassword: this.registerForm.get('confirmPassword').value,
    };

    const userInfo: UserInfo = new UserInfo(
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value,
        this.registerForm.get('email').value);

    this.service.register(userCreds, userInfo).subscribe(
      (): void => { this.location.replace('/account/confirm'); },
      (error: Error): void => {
        this.error = error.message;
      }
    );
  }
}
