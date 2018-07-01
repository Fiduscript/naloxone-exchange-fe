import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class ContactForm {

  @JsonProperty('name', String)
  public name: string = undefined;

  @JsonProperty('email', String)
  public email: string = undefined;

  @JsonProperty('message', String)
  public message: string = undefined;

  public constructor() {}

}
