import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class ErrorMessage {

  @JsonProperty('message', String)
  public readonly message: string = '';

  public constructor(message: string) {
    this.message = message;
  }

}
