import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class ErrorMessage {

  @JsonProperty('message', String)
  public message: string = undefined;

  public constructor(message: string) {
    this.message = message;
  }

}
