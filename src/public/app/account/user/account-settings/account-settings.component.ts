import { Component, Input, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserInfo } from '../../model/user-info';

@Component({
  selector: 'app-user-account-settings',
  templateUrl: './account-settings.component.pug',
  styleUrls: ['./account-settings.component.styl']
})
export class AccountSettingsComponent implements OnInit {

  private editingAttribute?: string = null;

  @Input() public user: UserInfo;

  public constructor(
    private modalService: NgbModal) {
  }

  public ngOnInit(): void {
  }

  public editAttribute(attribute: string, content: any) {
    this.editingAttribute = attribute;
    this.modalService.open(content).result.then(
      () => this.editingAttribute = null,
      () => this.editingAttribute = null);
  }

  public isPassword(): boolean {
    return this.editingAttribute != null && this.editingAttribute === 'password';
  }
}
