import { DataMapper } from '@aws/dynamodb-data-mapper';

import { attribute, autoGeneratedHashKey, rangeKey, table, versionAttribute } from '@aws/dynamodb-data-mapper-annotations';
import { AWSProvider } from '../provider/aws-provider';
import { IBusinessPurchaseOrder } from '../../public/app/buy/model/businessPurchaseOrder';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Env } from '../util/env';

const TABLE_NAME = 'business_purchase_orders';

@table(TABLE_NAME)
class BusinessPurchaseOrderEntity implements IBusinessPurchaseOrder {
  @attribute()
  attributionSource: string;

  @attribute()
  contactEmail: string;

  @attribute()
  contactName: string;

  @attribute()
  contactPhoneNumber: string;

  @attribute({defaultProvider: () => moment().toISOString()})
  createdAt: string;

  @autoGeneratedHashKey()
  id: string;

  @attribute()
  needByDate: string;

  @attribute()
  organizationName: string;

  @attribute()
  organizationType: string;

  @attribute()
  paidByGrant: string;

  @attribute()
  preferredContactType: string;

  @attribute()
  quantityRange: string;

  @attribute()
  requestedProductId: string;

  @attribute()
  signeeName: string;

  @versionAttribute()
  version: number;
}

export class BusinessPurchaseOrderDao {
  public static create = _.once((): BusinessPurchaseOrderDao => {
    return new BusinessPurchaseOrderDao(new DataMapper({
      client: AWSProvider.getDynmoClient(),
      tableNamePrefix: Env.isProd() ? 'prod_' : 'dev_'
    }));
  });

  /**
   * Creates singleton instance of a BusinessPurchaseOrderDao.
   */
  private constructor(private mapper: DataMapper) {}

  async createBusinessPurchaseOrder(businessPurchaseOrder: IBusinessPurchaseOrder) {
    return this.mapper.put(Object.assign(new BusinessPurchaseOrderEntity(), businessPurchaseOrder));
  }

  async getBusinessPurchaseOrder(id: string) {
    return this.mapper.get(Object.assign(new BusinessPurchaseOrderEntity(), {id: id}));
  }
}
