import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { LOCATION } from '../../util/window-injections';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  public error: string = null;
  public loginForm: FormGroup;
  public user: string = 'User';

  private returnRoute: string;

  public constructor(
      @Inject(LOCATION) private location: Location,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private service: AccountService) {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.service.login(this.loginForm.value).subscribe(
      (): void => { this.location.replace(this.returnRoute); },
      (error: Error): void => {
        this.loginForm.get('Password').reset();
        this.error = error.message;
      }
    );
  }

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.returnRoute = params['returnTo'] || '/';
    });
  }

  public socialSignIn(socialPlatform: string) {
    console.log(`login with ${socialPlatform}`);
  }
}
