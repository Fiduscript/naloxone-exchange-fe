import { Component, Input, OnInit } from '@angular/core';
import { IAddress } from '../../model/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.pug',
  styleUrls: ['./address.component.styl']
})
export class AddressComponent implements OnInit {

  @Input() public address: IAddress;
  @Input() public editable: boolean = false;
  // @Input() public selectable: boolean = false;

  public constructor() { }

  public ngOnInit(): void {
  }

}
