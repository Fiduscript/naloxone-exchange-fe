import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AccountService } from '../../account.service';

@Component({
  selector: 'app-user-update-password',
  templateUrl: './update-password.component.pug',
  styleUrls: ['./update-password.component.styl']
})
export class UpdatePasswordComponent implements OnInit {

  public constructor(
    private fb: FormBuilder,
    private service: AccountService) { }

  public ngOnInit(): void {
  }

}
