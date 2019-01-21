import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';

export interface IBusinessPurchaseOrder {
  attributionSource: string;
  contactEmail: string;
  contactName: string;
  contactPhoneNumber: string;
  createdAt: string;
  id: string;
  needByDate: string;
  organizationName: string;
  organizationType: string;
  paidByGrant: string;
  preferredContactType: string;
  quantityRange: string;
  requestedProductId: string;
  signeeName: string;
  version: number;
}

@JsonObject
export class BusinessPurchaseOrder implements IBusinessPurchaseOrder {

  @JsonProperty('attributionSource', String)
  public readonly attributionSource: string = '';

  @JsonProperty('contactEmail', String)
  public readonly contactEmail: string = '';

  @JsonProperty('contactName', String)
  public readonly contactName: string = '';

  @JsonProperty('contactPhoneNumber', String)
  public readonly contactPhoneNumber: string = '';

  @JsonProperty('createdAt', String)
  public readonly createdAt: string = '';

  @JsonProperty('id', String)
  public readonly id: string = '';

  @JsonProperty('needByDate', String)
  public readonly needByDate: string = '';

  @JsonProperty('organizationName', String)
  public readonly organizationName: string = '';

  @JsonProperty('organizationType', String)
  public readonly organizationType: string = '';

  @JsonProperty('paidByGrant', String)
  public readonly paidByGrant: string = '';

  @JsonProperty('preferredContactType', String)
  public readonly preferredContactType: string = '';

  @JsonProperty('quantityRange', String)
  public readonly quantityRange: string = '';

  @JsonProperty('requestedProductId', String)
  public readonly requestedProductId: string = '';

  @JsonProperty('signeeName', String)
  public readonly signeeName: string = '';

  @JsonProperty('version', Number)
  public readonly version: number = 0;

  constructor(businessPurchaseOrder: IBusinessPurchaseOrder) {
    _.merge(this, businessPurchaseOrder);
  }
}
