import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { version } from 'winston';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.pug',
  styleUrls: ['./privacy.component.styl']
})
export class PrivacyComponent implements OnInit {
  public version: String = 'TBD';

  constructor(
    public activeModal: NgbActiveModal) {
    }

  ngOnInit() {
  }

}
