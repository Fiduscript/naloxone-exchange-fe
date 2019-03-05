import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {v4 as uuid} from 'uuid';

import {IState, STATES} from '../../../../../common/constant/states';
import {ErrorMessage} from '../../../common/message-response';
import { UserAddress } from '../../model/user-address';
import {UserService} from '../user.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.pug',
  styleUrls: ['./address-form.component.styl']
})
export class AddressFormComponent implements OnInit {

  @Input() public address: UserAddress = {weekendOkay: true} as UserAddress;
  public error?: ErrorMessage = null;
  public form: FormGroup;
  @Input() public sucessCallback: () => {};

  public constructor(private fb: FormBuilder,
                     private service: UserService) {
  }

  public getStates(): IState[] {
    return STATES;
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.address.name, Validators.required],
      street: [this.address.street, Validators.required],
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

    const address: UserAddress = {
      userId: null, // set on server
      addressId: this.address.addressId,
      name: this.form.get('name').value,
      street: this.form.get('street').value,
      street2: this.form.get('street2').value,
      city: this.form.get('city').value,
      state: this.form.get('state').value,
      zip: this.form.get('zip').value,
      phoneNumber: this.form.get('phoneNumber').value,
      specialInstructions: this.form.get('specialInstructions').value,
      weekendOkay: this.form.get('weekendOkay').value,
    };

    // TODO fix
    this.service.saveAddress(address).subscribe(
      this.sucessCallback,
      (error: ErrorMessage) => {
        this.error = error;
        this.form.enable();
      }
    );
  }
}
