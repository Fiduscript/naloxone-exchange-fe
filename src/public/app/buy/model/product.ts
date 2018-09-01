import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class Product {

  @JsonProperty('id', String)
  public readonly id: string = '';

  @JsonProperty('administrationMethod', String)
  public readonly administrationMethod: string = '';

  @JsonProperty('dosage', String)
  public readonly dosage: string = '';

  @JsonProperty('fdaUri', String)
  public readonly fdaUri: string = '';

  @JsonProperty('imageUri', String)
  public readonly imageUri: string = '';

  @JsonProperty('notes', String)
  public readonly notes: string = '';

  @JsonProperty('price', Number)
  public readonly price: number = 45.00;

  @JsonProperty('title', String)
  public readonly title: string = '';

  public constructor() {}

}
