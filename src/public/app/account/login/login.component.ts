import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
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

  private returnRoute: string;

  public constructor(
      private cookieService: CookieService,
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
      (): void => { this.service.redirectUserOnLogin(); },
      (error: Error): void => {
        this.loginForm.get('Password').reset();
        this.error = error.message;
      }
    );
  }

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.returnRoute = this.cookieService.get('returnTo');
    });
  }

  public socialSignIn(socialPlatform: string) {
    this.service.authorizeSocial(socialPlatform).subscribe(
      (): void => {
        // do nothing
      },
      (error: Error): void => {
        this.error = error.message;
      }
    );
  }
}
