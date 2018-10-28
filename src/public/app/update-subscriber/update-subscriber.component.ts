import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Duration } from 'moment';

import { IState, STATES } from '../../../common/constant/states';
import { jsonConvert } from '../../../common/json-convert-provider';
import { MessageResponse } from '../common/message-response';
import { SubscriptionState } from './model/subscription-state';
import { UpdateSubscriberService } from './update-subscriber.service';

@Component({
  selector: 'app-update-subscriber',
  templateUrl: './update-subscriber.component.pug',
  styleUrls: ['./update-subscriber.component.styl']
})
export class UpdateSubscriberComponent implements OnInit {
  private static readonly DISMISS_LIMIT: Duration = moment.duration(1, 'week');

  private readonly LS_KEY: string = 'updateSubscriber';

  @Input() public selectedState: string = null;
  @Input() public showClose: boolean = true;

  public subscribeForm: FormGroup;
  public show: boolean = false;

  public constructor(
      private fb: FormBuilder,
      private service: UpdateSubscriberService) {
    this.subscribeForm = fb.group({
      email : ['', Validators.email],
      state: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.subscribeForm.setValue({
      email: '',
      state: this.selectedState || ''
    });

    const rawState: string = window.localStorage.getItem(this.LS_KEY);
    if (rawState == null) {
      this.show = true;
      return;
    }

    const state: SubscriptionState = jsonConvert.deserialize(JSON.parse(rawState), SubscriptionState);

    if (moment().isAfter(state.dismissed.clone().add(UpdateSubscriberComponent.DISMISS_LIMIT))) {
      this.show = true;
    }
  }

  public dismiss(): void {
    this.show = false;
    this.saveDismissed();
  }

  public subscribe(): void {
    this.service.subscribe(this.subscribeForm.value).subscribe(
        (msg: MessageResponse): void => {
          this.show = false;
          alert(msg.message);
        }, (error: HttpErrorResponse): void => {
          alert(error.error.message);
        });
  }

  public getStates(): IState[] {
    return STATES;
  }

  private saveDismissed(): void {
    const state: SubscriptionState = new SubscriptionState();
    const json: any = jsonConvert.serialize(state);
    window.localStorage.setItem(this.LS_KEY, JSON.stringify(json));
  }
}
