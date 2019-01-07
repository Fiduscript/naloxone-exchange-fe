import { Component, OnInit } from '@angular/core';

import { IAddress } from '../../model/address';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.pug',
  styleUrls: ['./addresses.component.styl']
})
export class AddressesComponent implements OnInit {

  public addresses: IAddress[] = [];

  public constructor(private service: UserService) { }

  public ngOnInit(): void {
    this.service.getAddressses().subscribe((addresses: IAddress[]) => {
      this.addresses = addresses;
    });
  }

}
