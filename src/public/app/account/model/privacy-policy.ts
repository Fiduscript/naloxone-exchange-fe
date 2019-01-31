import { JsonObject, JsonProperty } from 'json2typescript';
import { Moment } from 'moment';

import { MomentConverter } from '../../util/moment-utils';

@JsonObject
export class PrivacyPolicy {

  @JsonProperty('policy', String)
  public readonly policy: string = undefined;

  @JsonProperty('versionDate', MomentConverter)
  public readonly versionDate: Moment = undefined;

  public constructor() {}

  public getVersionString(): string {
    return this.versionDate.toISOString();
  }

}
