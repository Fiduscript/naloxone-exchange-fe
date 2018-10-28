import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../account.service';
import { UserInfo } from '../../model/user-info';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.pug',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  public user: UserInfo;

  public constructor(private loginService: AccountService) {
    this.user = new UserInfo();
  }

  public ngOnInit(): void {
    this.loginService.whoami().subscribe((user: UserInfo): void => {
      this.user = user;
    });
  }

}
