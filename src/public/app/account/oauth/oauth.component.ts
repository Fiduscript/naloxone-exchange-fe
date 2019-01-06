import { Component, Inject, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  templateUrl: './oauth.component.pug',
  styleUrls: ['./oauth.component.styl']
})
export class OauthComponent implements OnInit {

  public error: string = null;

  public constructor(
    private loginService: AccountService) {
  }

  public ngOnInit() {
    this.loginService.authorizeOauth(window.location.href).subscribe(
      (): void => {
        this.loginService.redirectUserOnLogin();
      },
      (error: Error): void => {
        this.error = error.message;
      }
    );
  }
}
