import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public user: string = 'User';
  private error: string = null;

  public constructor(
      private fb: FormBuilder,
      private service: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
      }

  public ngOnInit() {}

  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.service.login(this.loginForm.value).subscribe(
      (): void => { window.location.replace('/'); },
      (error: HttpErrorResponse): void => {
        this.loginForm.get('password').reset();
        this.error = error.error.message;
      }
    );
  }

  public socialSignIn(socialPlatform: string) {
    console.log(`login with ${socialPlatform}`);
  }
}
