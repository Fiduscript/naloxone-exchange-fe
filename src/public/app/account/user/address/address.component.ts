import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import {ErrorMessage} from '../../../common/message-response';
import {UserAddress } from '../../model/user-address';
import {UserService} from '../user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.pug',
  styleUrls: ['./address.component.styl']
})
export class AddressComponent implements OnInit {

  @Input() public address: UserAddress;
  @Input() public changedCallback: () => void = _.identity();
  @Input() public editable: boolean = false;

  public error?: ErrorMessage = null;
  private modal?: NgbModalRef = null;

  public constructor(private service: UserService,
                     private modalService: NgbModal) {
    this.clearModal = this.clearModal.bind(this);
    this.editSuccessCallback = this.editSuccessCallback.bind(this);
    this.flashError = this.flashError.bind(this);
  }

  public deleteAddress(): void {
    this.service.deleteAddress(this.address).subscribe(
      this.changedCallback,
      this.flashError
    );
  }

  public editAddress(context: any): void {
    this.modal = this.modalService.open(context, {size: 'lg'});
    this.modal.result.then(this.clearModal, this.clearModal);
  }

  public editSuccessCallback(): void {
    this.modal.close();
    this.changedCallback();
  }

  public ngOnInit(): void {
  }

  private clearModal(): void {
    this.modal = null;
  }

  private flashError(error: ErrorMessage): void {
    this.error = error;
    setTimeout(() => {
      this.error = null;
    }, 4000);
  }
}
