import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FiduServiceBase } from '../../common/fidu-service-base';
import { IBusinessPurchaseOrder } from '../model/businessPurchaseOrder';

/**
 * Service for interacting with B2B objects.
 */
@Injectable({
  providedIn: 'root'
})
export class B2bService extends FiduServiceBase {

  public constructor(private http: HttpClient) {
    super();
  }

  /**
   * Creates a business purchase order by calling `/api/b2b`
   * @param businessPurchaseOrder purchase order form.
   * @return generated id of the new purchase order form.
   */
  public creatingBusinessPurchaseOrder(businessPurchaseOrder: any): Observable<IBusinessPurchaseOrder> {
    const path: string = '/api/b2b';
    return this.http.put<IBusinessPurchaseOrder>(path, businessPurchaseOrder).pipe(
      this.logErrors()
    );
  }

  /**
   * Check if a business purchase order exists by calling `/api/b2b/exists/:id`
   * @param id id of the business purchase order.
   * @return true if the purchase order exists.
   */
  public businessPurchaseOrderExists(id: string): Observable<boolean> {
    const path: string = `/api/b2b/exists/${id}`;
    return this.http.get<boolean>(path).pipe(
      this.logErrors()
    );
  }
}
