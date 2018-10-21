import { Component, Input, OnInit } from '@angular/core';

import { UserInfo } from '../../model/user-info';

@Component({
  selector: 'app-user-account-settings',
  templateUrl: './account-settings.component.pug',
  styleUrls: ['./account-settings.component.styl']
})
export class AccountSettingsComponent implements OnInit {

  @Input() public user: UserInfo;

  public constructor() {
  }

  public ngOnInit(): void {
  }

}
