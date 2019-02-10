import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

import { IState, STATES } from '../../../../../common/constant/states';
import { ErrorMessage } from '../../../common/message-response';
import { IAddress } from '../../model/address';
import { UserService } from '../user.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.pug',
  styleUrls: ['./address-form.component.styl']
})
export class AddressFormComponent implements OnInit {

  @Input() public address: IAddress = {weekendOkay: true} as IAddress;
  public error?: ErrorMessage = null;
  public form: FormGroup;
  @Input() public sucessCallback: () => {};

  public constructor(
    private fb: FormBuilder,
    private service: UserService) { }

  public getStates(): IState[] {
    return STATES;
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.address.name, Validators.required],
      street1: [this.address.street1, Validators.required],
      street2: [this.address.street2],
      city: [this.address.city, Validators.required],
      state: [this.address.state, Validators.required],
      zip: [this.address.zip, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      phoneNumber: [this.address.phoneNumber],
      specialInstructions: [this.address.specialInstructions, Validators.maxLength(256)],
      weekendOkay: [this.address.weekendOkay]
    });
  }

  public reset(): void {
    this.form.reset(this.address, {emitEvent: false});
  }

  public sectionInvalid(section: string): boolean {
    return this.form.get(section).touched && this.form.get(section).invalid;
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    // reset error
    this.error = null;
    this.form.disable();

    const address: IAddress = {
      userId: '', // this will be set in the service
      addressId: this.address.addressId || uuid(),
      name: this.form.get('name').value,
      street1: this.form.get('street1').value,
      street2: this.form.get('street2').value,
      city: this.form.get('city').value,
      state: this.form.get('state').value,
      zip: this.form.get('zip').value,
      phoneNumber: this.form.get('phoneNumber').value,
      specialInstructions: this.form.get('specialInstructions').value,
      weekendOkay: this.form.get('weekendOkay').value,
    };

    this.service.setAddress(address).subscribe(
      this.sucessCallback,
      (error: ErrorMessage) => {
        this.error = error;
        this.form.enable();
      }
    );
  }
}
