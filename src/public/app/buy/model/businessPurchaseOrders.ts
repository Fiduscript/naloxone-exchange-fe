import { JsonObject, JsonProperty } from 'json2typescript';

import { BusinessPurchaseOrder } from './businessPurchaseOrder';

@JsonObject
export class BusinessPurchaseOrders {

  @JsonProperty('items', [BusinessPurchaseOrder])
  public readonly items: BusinessPurchaseOrder[] = [];

  public constructor(items: BusinessPurchaseOrder[] = []) {
    this.items = items;
  }
}
