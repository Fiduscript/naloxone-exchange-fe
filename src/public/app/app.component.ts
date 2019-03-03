import { Component, ElementRef, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { AccountService } from './account/account.service';
import { UserInfo } from './account/model/user-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  public isCollapsed: boolean = true;
  public showCrisis: boolean = true;
  public user: UserInfo;

  private mainHeaderHeight?: number = 0;

  public constructor(private loginService: AccountService) {
    this.user = new UserInfo();
    this.updateMainHeaderHeight = this.updateMainHeaderHeight.bind(this);
  }

  public dismissCrisis(mainHeader: HTMLElement): void {
    this.showCrisis = false;
    _.defer(_.partial(this.updateMainHeaderHeight, mainHeader));
  }

  public getMainHeaderHeight(mainHeader: HTMLElement): string {
    if (this.mainHeaderHeight === 0) {
      this.updateMainHeaderHeight(mainHeader);
    }
    return `${this.mainHeaderHeight}px`;
  }

  public ngOnInit(): void {
    this.loginService.whoami().subscribe((user: UserInfo) => {
      this.user = user;
    });
  }

  public toggleMenu(mainHeader: HTMLElement): void {
    this.isCollapsed = !this.isCollapsed;
    _.defer(_.partial(this.updateMainHeaderHeight, mainHeader));
  }

  public updateMainHeaderHeight(mainHeader: HTMLElement) {
    this.mainHeaderHeight = mainHeader.offsetHeight;
  }
}
