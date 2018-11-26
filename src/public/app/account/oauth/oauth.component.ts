import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LOCATION } from '../../util/window-injections';
import { AccountService } from '../account.service';

@Component({
  templateUrl: './oauth.component.pug',
  styleUrls: ['./oauth.component.styl']
})
export class OauthComponent implements OnInit {

  public error: string = null;

  private returnRoute: string;

  public constructor(
    @Inject(LOCATION) private location: Location,
    private loginService: AccountService,
    private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.returnRoute = params['returnTo'] || '/';
    });

    this.loginService.authorizeOauth(window.location.href).subscribe(
      (): void => {
        this.location.replace(this.returnRoute);
      },
      (error: Error): void => {
        this.error = error.message;
      }
    );
  }
}
