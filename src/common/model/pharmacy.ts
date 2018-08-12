import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Pharmacy {

  @JsonProperty('id', Number)
  public readonly id: number = undefined;

  @JsonProperty('image', String)
  public readonly image: string = undefined;

  @JsonProperty('name', String)
  public readonly name: string = undefined;

  @JsonProperty('address', String)
  public readonly address: string = undefined;

  @JsonProperty('description', String)
  public readonly description: string = undefined;

  @JsonProperty('hours', [String])
  public readonly hours: string[] = undefined;

  @JsonProperty('homepage', String)
  public readonly homepage: string = undefined;

  public constructor() {}

}
