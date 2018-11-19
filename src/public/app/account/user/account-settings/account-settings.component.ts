import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { UserInfo } from '../../model/user-info';

@Component({
  selector: 'app-user-account-settings',
  templateUrl: './account-settings.component.pug',
  styleUrls: ['./account-settings.component.styl']
})
export class AccountSettingsComponent implements OnInit {

  private editingAttribute?: string = null;
  private modal?: NgbModalRef = null;

  @Input() public user: UserInfo;

  public constructor(
      private modalService: NgbModal) {

    this.clearAttrs = this.clearAttrs.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public ngOnInit(): void {
  }

  public editAttribute(attribute: string, content: any) {
    this.editingAttribute = attribute;
    this.modal = this.modalService.open(content);
    this.modal.result.then(this.clearAttrs, this.clearAttrs);
  }

  public isPassword(): boolean {
    return this.editingAttribute != null && this.editingAttribute === 'password';
  }

  public closeModal(): void {
    if (this.modal != null) {
      this.modal.close();
    }
  }

  private clearAttrs(): void {
    this.editAttribute = null;
    this.modal = null;
  }
}
