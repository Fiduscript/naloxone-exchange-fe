import { Component, Inject, OnInit } from '@angular/core';

import { SuccessMessage } from '../../common/message-response';
import { LOCATION } from '../../util/window-injections';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.pug'
})
export class LogoutComponent implements OnInit {

  public constructor(
    @Inject(LOCATION) private location: Location,
    private service: AccountService) { }

  public ngOnInit(): void {
    this.service.logout()
        // TODO add retries from rxjs
        .subscribe((message: SuccessMessage) => {
          this.location.replace('/');
        });
  }

}
