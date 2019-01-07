import { Component, Input, OnInit } from '@angular/core';

import { IAddress } from '../../model/address';
import { UserService } from '../user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.pug',
  styleUrls: ['./address.component.styl']
})
export class AddressComponent implements OnInit {

  @Input() public address: IAddress;
  @Input() public editable: boolean = false;
  // @Input() public selectable: boolean = false;

  public constructor(private service: UserService) { }

  public deleteAddress(): void {
    console.log('delete address');
  }

  public editAddress(): void {
    console.log('open edit dialog');
  }

  public ngOnInit(): void {
  }
}
