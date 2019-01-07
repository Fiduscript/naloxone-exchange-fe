import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ErrorMessage } from '../../../common/message-response';
import { IAddress } from '../../model/address';
import { UserService } from '../user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.pug',
  styleUrls: ['./address.component.styl']
})
export class AddressComponent implements OnInit {

  @Input() public address: IAddress;
  @Input() public changedCallback: () => void = _.identity();
  @Input() public editable: boolean = false;
  public error?: ErrorMessage = null;

  public constructor(private service: UserService) {
    this.flashError = this.flashError.bind(this);
  }

  public deleteAddress(): void {
    this.service.deleteAddress(this.address.addressId).subscribe(
      this.changedCallback,
      this.flashError
    );
  }

  public editAddress(): void {
    console.log('open edit dialog');
  }

  public ngOnInit(): void {

  }

  private flashError(error: ErrorMessage): void {
    this.error = error;
    setTimeout(() => { this.error = null; }, 4000);
  }
}
