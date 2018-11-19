import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { MatchValidator } from '../../../../../common/validator/match-validator';
import { StrongPasswordValidator } from '../../../../../common/validator/strong-password-validator';
import { SuccessMessage } from '../../../common/message-response';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-user-update-password',
  templateUrl: './update-password.component.pug',
  styleUrls: ['./update-password.component.styl']
})
export class UpdatePasswordComponent implements OnInit {

  @Input() public sucessCallback?: () => void = _.identity;

  public form: FormGroup;

  public error?: string = null;
  public success?: SuccessMessage = null;

  public constructor(
      private fb: FormBuilder,
      private service: AccountService) {
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [new StrongPasswordValidator()]],
      confirmNewPassword: ['', [Validators.required, new MatchValidator('newPassword')]]
    });
  }

  public ngOnInit(): void {
  }

  public update() {
    if (this.form.invalid) {
      return;
    }
    this.error = null;
    this.form.disable();

    const oldPass: string = this.form.get('currentPassword').value;
    const newPass: string = this.form.get('newPassword').value;

    this.service.updatePassword(oldPass, newPass).subscribe(
      (success: SuccessMessage) => {
        this.success = success;
        this.sucessCallback();
      },
      (error: any) => {
        this.error = error.message;
        this.form.enable();
      });
  }
}
