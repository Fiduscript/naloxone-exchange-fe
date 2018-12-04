import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.pug',
  styleUrls: ['./privacy.component.styl']
})
export class PrivacyComponent implements OnInit {

  public error: string = null;
  public privacyContent: String;
  public privacyVersion: String;

  constructor(
    public activeModal: NgbActiveModal,
    private service: AccountService) {
    }

  public getPrivacyPolicy() {
    this.service.getPrivacyPolicy().subscribe(
      (policy) => {
      this.privacyVersion = policy.date;
      this.privacyContent = policy.policy;
      },
      (error: Error): void => {
        this.error = error.message;
      }
    );
  }

  ngOnInit() {
    this.getPrivacyPolicy();
  }

}
