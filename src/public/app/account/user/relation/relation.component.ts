import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import { ErrorMessage } from '../../../common/message-response';
import { UserRelation } from '../model/user-relation';
import { UserService } from '../user.service';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.pug',
  styleUrls: ['./relation.component.styl']
})
export class RelationComponent implements OnInit {

  @Input() public changedCallback: () => void = _.identity;
  @Input() public editable: boolean = false;
  public error?: ErrorMessage = null;
  @Input() public relation: UserRelation;
  private modal?: NgbModalRef = null;

  public constructor(
      private service: UserService,
      private modalService: NgbModal) {
    this.clearModal = this.clearModal.bind(this);
    this.editSuccessCallback = this.editSuccessCallback.bind(this);
    this.flashError = this.flashError.bind(this);
  }

  public delete(): void {
    this.service.deleteRelation(this.relation.id)
        .subscribe(this.changedCallback, this.flashError);
  }

  public edit(context: any): void {
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
    setTimeout(() => { this.error = null; }, 4000);
  }
}
