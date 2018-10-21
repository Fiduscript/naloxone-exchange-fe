import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../login/login.service';
import { UserInfo } from '../../model/userInfo';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.pug',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  public user: UserInfo;

  public constructor(
      private loginService: LoginService,
      private userService: UserService) {
    this.user = new UserInfo();
  }

  public ngOnInit(): void {
    this.loginService.whoami().subscribe((user: UserInfo): void => {
      if (!user.hasName()) {
        // XXX: this probably should be handled via cookies instead.
        // TODO: redirect to login with a forwarding sequence to this page.
      }
      this.user = user;
    });
  }

}
