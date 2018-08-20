import { JsonObject, JsonProperty } from 'json2typescript';
import { Moment } from 'moment';
import * as moment from 'moment';

import { MomentConverter } from '../../util/moment-utils';

@JsonObject
export class SubscriptionState {
  @JsonProperty('dismissed', MomentConverter)
  public dismissed: Moment = moment();

  @JsonProperty('subscribed', Boolean)
  public subscribed: boolean = false;

  constructor(subscribed: boolean = false) {
    this.subscribed = subscribed;
  }
}
