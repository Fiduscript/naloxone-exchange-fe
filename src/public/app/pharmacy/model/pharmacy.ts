import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

@JsonObject
export class Pharmacy {

  @JsonProperty('address', String)
  public readonly address: string = undefined;

  @JsonProperty('description', String)
  public readonly description: string = undefined;

  @JsonProperty('email', String, true)
  public readonly email: string = undefined;

  @JsonProperty('homepage', String, true)
  public readonly homepage: string = undefined;

  @JsonProperty('hours', [String], true)
  public readonly hours: string[] = [];

  @JsonProperty('id', Number)
  public readonly id: number = undefined;

  @JsonProperty('image', String, true)
  public readonly image: string = undefined;

  @JsonProperty('name', String)
  public readonly name: string = undefined;

  @JsonProperty('phone', String, true)
  public readonly phone: string = undefined;

  public constructor() {}

  public hasContactInfo(): boolean {
    return !_.isEmpty(this.email) || !_.isEmpty(this.phone) || !_.isEmpty(this.homepage);
  }
}
