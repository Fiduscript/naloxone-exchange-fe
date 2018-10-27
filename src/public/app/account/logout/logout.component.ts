import { Component, OnInit } from '@angular/core';

import { SuccessMessage } from '../../common/message-response';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.pug',
})
export class LogoutComponent implements OnInit {

  public constructor(
    private service: AccountService) { }

  public ngOnInit(): void {
    this.service.logout()
        // TODO add retries from rxjs
        .subscribe((message: SuccessMessage) => {
          window.location.replace('/');
        });

  }

}