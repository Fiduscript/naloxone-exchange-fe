import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
