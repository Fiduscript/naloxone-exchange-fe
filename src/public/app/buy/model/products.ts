import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

import { Product } from './product';

@JsonObject
export class Products {

  @JsonProperty('items', [Product])
  public readonly items: Product[] = [];

  public constructor(items: Product[] = []) {
    this.items = items;
  }

  /**
   * IF a state has no products, we can assume that it has no details.
   */
  public isSupportedState(): boolean {
    return !_.isEmpty(this.items);
  }
}
