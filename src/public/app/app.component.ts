import { Component, OnInit } from '@angular/core';

import { LoginService } from './account/login/login.service';
import { UserInfo } from './account/model/userInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  isCollapsed: boolean = true;

  showCrisis: boolean = true;

  user: UserInfo;

  public constructor(private loginService: LoginService) {
    this.user = new UserInfo();
  }

  public ngOnInit(): void {
    this.loginService.whoami().subscribe((user: UserInfo) => {
      this.user = user;
    });
  }

  public dismissCrisis(): void {
    this.showCrisis = false;
  }

  public showSubscribe(): boolean {
    return window.location.pathname.includes('/buy');
  }

  public toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
