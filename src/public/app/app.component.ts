import { Component, OnInit } from '@angular/core';

import { AccountType } from '../../common/account-types';
import { AccountTypeService } from './account/account-type.service';
import { AccountService } from './account/account.service';
import { UserInfo } from './account/model/user-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  accountType: string;
  buyLink: string;
  isCollapsed: boolean = true;
  showCrisis: boolean = true;
  user: UserInfo;

  public constructor(private loginService: AccountService, private accountTypeService: AccountTypeService) {
    this.user = new UserInfo();
    this.accountType = this.accountTypeService.getAccountTypeString();
    this.buyLink = accountTypeService.accountTypeMatches(AccountType.Business) ? '/buy/b2b' : '/buy';
  }

  public dismissCrisis(): void {
    this.showCrisis = false;
  }

  public ngOnInit(): void {
    this.loginService.whoami().subscribe((user: UserInfo) => {
      this.user = user;
    });
  }

  public showSubscribe(): boolean {
    return window.location.pathname.includes('/buy');
  }

  public toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
