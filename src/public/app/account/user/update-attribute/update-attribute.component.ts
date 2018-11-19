import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { IAuthenticationDetailsData, ICognitoUserAttributeData } from 'amazon-cognito-identity-js';
import { MatchValidator } from '../../../../../common/validator/match-validator';
import { SuccessMessage } from '../../../common/message-response';
import { AccountService } from '../../account.service';
import { UserInfo } from '../../model/user-info';

@Component({
  selector: 'app-user-update-attribute',
  templateUrl: './update-attribute.component.pug',
  styleUrls: ['./update-attribute.component.styl']
})
export class UpdateAttributeComponent implements OnInit {
  private static readonly DISPLAY_SETTINGS: {[attr: string]: IDisplaySettings} = {
    'default': {
        placeholder: '',
        requirePassord: false,
        requireVerify: false,
        validators: [Validators.required]},
    'email': {
        placeholder: 'john.doe@mail.com',
        requirePassord: true,
        requireVerify: true,
        validators: [Validators.required, Validators.email]},
    'name': {placeholder: 'John Doe'}
  };

  @Input() public attributeName: string;


  public displaySettings: IDisplaySettings = UpdateAttributeComponent.DISPLAY_SETTINGS.default;
  public form: FormGroup;
  public user: UserInfo = new UserInfo();

  public error?: string = null;
  public success?: SuccessMessage = null;

  public constructor(
    private fb: FormBuilder,
    private service: AccountService) { }

  public ngOnInit(): void {
    this.service.whoami().subscribe((user: UserInfo) => {
      this.user = user;
    });

    this.displaySettings = _.defaults({},
        UpdateAttributeComponent.DISPLAY_SETTINGS[this.attributeName],
        UpdateAttributeComponent.DISPLAY_SETTINGS['default']);

    const controlsConfig = {};

    controlsConfig[this.attributeName] = ['', this.displaySettings.validators];

    // add verify confirm element
    if (this.displaySettings.requireVerify) {
      controlsConfig[`confirm${this.attributeName}`] = ['', [Validators.required, new MatchValidator(this.attributeName)]];
    }

    // add password element
    if (this.displaySettings.requirePassord) {
      controlsConfig['password'] = ['', Validators.required];
    }
    this.form = this.fb.group(controlsConfig);

  }

  public update(): void {
    if (this.form.invalid) {
      return;
    }
    this.error = null;
    this.form.disable();

    const credentials: IAuthenticationDetailsData = this.displaySettings.requirePassord ?
        {
          Password: this.form.get('password').value,
          Username: this.user.email
        } : null;

      const newAttr: ICognitoUserAttributeData = {
        Name: this.attributeName,
        Value: this.form.get(this.attributeName).value
      };

      this.service.updateUserInfo([newAttr], credentials).subscribe(
        (success: SuccessMessage) => {
          this.success = success;
          window.location.reload();
        },
        (error) => {
          this.error = error.message;
          this.form.enable();
        }
      );
  }
}

interface IDisplaySettings {
  placeholder?: string;
  requireVerify?: boolean;
  requirePassord?: boolean;
  validators?: ValidatorFn[];
}
