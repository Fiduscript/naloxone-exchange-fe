import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../login/login.service';
import { UserInfo } from '../../model/user-info';

@Component({
  selector: 'app-user-account-settings',
  templateUrl: './account-settings.component.pug',
  styleUrls: ['./account-settings.component.styl']
})
export class AccountSettingsComponent implements OnInit {

  public user: UserInfo;

  public constructor(private loginService: LoginService) {
    this.user = new UserInfo();
  }

  public ngOnInit(): void {
    this.loginService.whoami().subscribe((user: UserInfo) => {
      // XXX: if user is not logged in should redirect
      this.user = user;
    });
  }

}
