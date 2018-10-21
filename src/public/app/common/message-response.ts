import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class MessageResponse {

  @JsonProperty('message', String)
  public readonly message: string = '';

  public constructor(message: string) {
    this.message = message;
  }
}

export class SuccessMessage extends MessageResponse {
  public constructor(message: string) {
    super(message);
  }
}

export class ErrorMessage extends MessageResponse {
  public constructor(message: string) {
    super(message);
  }
}
