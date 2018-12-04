import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.pug',
  styleUrls: ['./privacy.component.styl']
})
export class PrivacyComponent implements OnInit {

  @Input() privacyContent: String;
  @Input() privacyVersion: String;

  constructor(
    public activeModal: NgbActiveModal) {
    }

  ngOnInit() {
  }

}
