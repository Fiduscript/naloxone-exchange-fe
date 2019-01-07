import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IAddress } from '../../model/address';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.pug',
  styleUrls: ['./addresses.component.styl']
})
export class AddressesComponent implements OnInit {

  public addresses: IAddress[] = [];
  private modal?: NgbModalRef = null;

  public constructor(
      private service: UserService,
      private modalService: NgbModal) {
    this.closeModal = this.closeModal.bind(this);
    this.clearModal = this.clearModal.bind(this);
    this.fetchAddresses = this.fetchAddresses.bind(this);
  }

  public addAddress(context: any): void {
    this.modal = this.modalService.open(context, {size: 'lg'});
    this.modal.result.then(this.clearModal, this.clearModal);
  }

  public closeModal(): void {
    this.fetchAddresses();
    this.modal.close();
  }

  public fetchAddresses(): void {
    this.service.getAddressses().subscribe((addresses: IAddress[]) => {
      this.addresses = addresses;
    });
  }

  public ngOnInit(): void {
    this.fetchAddresses();
  }

  private clearModal(): void {
    this.modal = null;
  }
}
