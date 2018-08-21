import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Product {

  @JsonProperty('id', String)
  public readonly id: string = '';

  @JsonProperty('price', Number)
  public readonly price: number = 45.00;

  @JsonProperty('title', String)
  public readonly title: string = '';

  @JsonProperty('details', String)
  public readonly details: string = '';

  @JsonProperty('detailShort', String)
  public readonly detailShort: string = '';

  @JsonProperty('imageUri', String)
  public readonly imageUri: string = '';

  @JsonProperty('usage', String)
  public readonly usage: string = '';

  public constructor() {}

}
