import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyPolicy } from '../model/privacy-policy';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.pug',
  styleUrls: ['./privacy.component.styl']
})
export class PrivacyComponent implements OnInit {

  @Input() public privacyPolicy: PrivacyPolicy;

  public constructor(public activeModal: NgbActiveModal) {}

  public ngOnInit(): void {}

}
