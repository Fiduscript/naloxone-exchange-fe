import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AccountTypeService } from '../../account-type.service';
import { UserInfo } from '../../model/user-info';

@Component({
  selector: 'app-user-account-settings',
  templateUrl: './account-settings.component.pug',
  styleUrls: ['./account-settings.component.styl']
})
export class AccountSettingsComponent implements OnInit {

  @Input() public user: UserInfo;

  private editingAttribute?: string = null;
  private modal?: NgbModalRef = null;

  public constructor(private modalService: NgbModal, public accountTypeService: AccountTypeService) {
    this.clearAttrs = this.clearAttrs.bind(this);
  }

  public closeModal(): void {
    if (this.modal != null) {
      this.modal.close();
    }
  }

  public editAttribute(attribute: string, content: any) {
    this.editingAttribute = attribute;
    this.modal = this.modalService.open(content);
    this.modal.result.then(this.clearAttrs, this.clearAttrs);
  }

  public isPassword(): boolean {
    return this.editingAttribute != null && this.editingAttribute === 'password';
  }

  public ngOnInit(): void {
  }

  private clearAttrs(): void {
    this.editAttribute = null;
    this.modal = null;
  }
}
