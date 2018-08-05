import { JsonObject, JsonProperty } from 'json2typescript';

import { ProductDetail } from './product-detail';

@JsonObject
export class ProductDetails {

  @JsonProperty('items', [ProductDetail])
  public readonly items: ProductDetail[] = [];

  public constructor(
      items: ProductDetail[] = []) {
    this.items = items;
  }

}
