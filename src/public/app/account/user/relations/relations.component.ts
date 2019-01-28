import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserRelations } from '../model/user-relation';
import { UserService } from '../user.service';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.pug',
  styleUrls: ['./relations.component.styl']
})
export class RelationsComponent implements OnInit {

  public relations: UserRelations = new UserRelations();
  private modal?: NgbModalRef = null;

  public constructor(
      private service: UserService,
      private modalService: NgbModal) {
    this.clearModal = this.closeModal.bind(this);
    this.clearModal = this.clearModal.bind(this);
    this.fetchRelations = this.fetchRelations.bind(this);
  }

  public addRelation(context: any): void {
    this.modal = this.modalService.open(context, {size: 'lg'});
    this.modal.result.then(this.clearModal, this.clearModal);
  }

  public closeModal(): void {
    this.fetchRelations();
    this.modal.close();
  }

  public fetchRelations(): void {
    this.service.getRelations().subscribe((relations: UserRelations) => {
      this.relations = relations;
    });
  }

  public ngOnInit(): void {
    this.fetchRelations();
  }

  private clearModal(): void {
    this.modal = null;
  }

}
