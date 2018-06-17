import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class ProductDetail {

  @JsonProperty("id", String)
  public readonly id: string = undefined;

  @JsonProperty("price", Number)
  public readonly price: number = 0.0;

  @JsonProperty("title", String)
  public readonly title: string = undefined;

  @JsonProperty("details", String)
  public readonly details: string = undefined;

  @JsonProperty("detailShort", String)
  public readonly detailShort: string = undefined;

  @JsonProperty("imageUri", String)
  public readonly imageUri: string = undefined;

  @JsonProperty("usage", String)
  public readonly usage: string = undefined;

  public constructor() {}

}
