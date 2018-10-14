import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

import { UserInfo } from '../model/userInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: LoginService
  ) {}

  public user: string = 'User';

  public ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.service.login(this.loginForm.value).subscribe(
      (userInfo: UserInfo): void => {
        console.log(userInfo, 'user info from login service');
      }
    );
  }

  public socialSignIn(socialPlatform: string) {
    console.log(`login with ${socialPlatform}`);
  }

  public signup(): void {
    console.log(`let's creat an account!!`);
  }
}
