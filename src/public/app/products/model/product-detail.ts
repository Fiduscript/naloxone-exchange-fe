import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class ProductDetail {

  @JsonProperty("id", String)
  public readonly id: string = undefined;

  @JsonProperty("price", Number)
  public readonly price: number = 45.00;

  @JsonProperty("title", String)
  public readonly title: string = undefined;

  @JsonProperty("details", [String])
  public readonly details: string[] = [];

  @JsonProperty("imageUri", String)
  public readonly imageUri: string = "";

  @JsonProperty("usage", String)
  public readonly usage: string = "";

  public constructor(
      id?: string,
      title?: string,
      details: string[] = [],
      imageUri: string = "",
      usage: string = "") {
    this.id = id;
    this.title = title;
    this.details = details;
    this.imageUri = imageUri;
  }

}