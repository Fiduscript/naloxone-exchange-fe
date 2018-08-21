import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Duration } from 'moment';

import { IState, STATES } from '../../../common/constant/states';
import { jsonConvert } from '../util/json-convert-provider';
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

  @Input() public showClose: boolean = true;
  public subscribeForm: FormGroup;
  public show: boolean = false;

  public constructor(
      private fb: FormBuilder,
      private service: UpdateSubscriberService) {
    this.subscribeForm = fb.group({
      email : [null, Validators.email],
      state: [null, Validators.required],
    });
  }

  ngOnInit() {
    const rawState: string = window.localStorage.getItem(this.LS_KEY);
    if (rawState == null) {
      this.show = true;
      return;
    }

    const state: SubscriptionState = jsonConvert.deserialize(JSON.parse(rawState), SubscriptionState);

    if (moment().isAfter(state.dismissed.clone().add(UpdateSubscriberComponent.DISMISS_LIMIT))
      && !state.subscribed) {
      this.show = true;
    }
  }

  public dismiss(): void {
    this.show = false;
    this.saveState();
  }

  public subscribe(): void {
    this.service.subscribe(this.subscribeForm.value).subscribe(
       (msg: string): void => {
          this.show = false;
          this.saveState(true);
        }, (error: HttpResponse<any>): void => {
          alert(error.body().message);
        });
  }

  public getStates(): IState[] {
    return STATES;
  }

  private saveState(subscribed: boolean = false): void {
    const state: SubscriptionState = new SubscriptionState(subscribed);
    const json: any = jsonConvert.serialize(state);
    window.localStorage.setItem(this.LS_KEY, JSON.stringify(json));
  }
}
