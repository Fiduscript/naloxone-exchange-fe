import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public user: string = 'User';
  public error: string = null;

  private returnRoute: string;

  public constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private service: AccountService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.returnRoute = params['returnTo'] || '/';
    });
  }

  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.service.login(this.loginForm.value).subscribe(
      (): void => { window.location.replace(this.returnRoute); },
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
