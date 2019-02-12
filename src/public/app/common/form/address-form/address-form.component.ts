import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IState, STATES } from '../../../../../common/constant/states';
import { ErrorMessage } from '../../message-response';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.pug',
  styleUrls: ['./address-form.component.styl']
})
export class AddressFormComponent implements OnInit {
  public address: FormBuilder;

  @Input()
  public formName: string;

  @Input()
  public parentForm: FormGroup;
  public error?: ErrorMessage = null;
  public form: FormGroup;

  public addressForm: FormGroup;

  public constructor(
    private fb: FormBuilder) { }

  public getStates(): IState[] {
    return STATES;
  }

  public ngOnInit(): void {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      street1: ['', Validators.required],
      street2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    });

    if (this.parentForm) {
      this.parentForm.addControl(this.formName, this.addressForm);
    }
  }

  public sectionInvalid(section: string): boolean {
    return this.addressForm.get(section).touched
      && this.addressForm.get(section).invalid;
  }
}
