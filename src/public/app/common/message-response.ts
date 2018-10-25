import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class MessageResponse {

  @JsonProperty('message', String)
  public readonly message: string = '';

  public constructor(message: string = '') {
    this.message = message;
  }
}

@JsonObject
export class SuccessMessage extends MessageResponse {
  public constructor(message: string = '') {
    super(message);
  }
}

@JsonObject
export class ErrorMessage extends MessageResponse {
  public constructor(message: string = '') {
    super(message);
  }
}
