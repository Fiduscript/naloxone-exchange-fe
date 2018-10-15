import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { FiduServiceBase } from '../common/fidu-service-base';
import { Products } from './model/products';

@Injectable({
  providedIn: 'root'
})
export class BuyService extends FiduServiceBase {

  public constructor(private http: HttpClient) {
    super();
  }

  /**
   * Fetches products from `/api/product/list/state/:state` that are avaialble in a particular state
   * @param state the name of the state in question
   * @return observable of Products
   */
  public stateProducts(state: string): Observable<Products> {
    const key: string = `/api/product/list/state/${state}`;
    if (this.hasMemo(key)) {
      return this.getMemoized(key);
    }

    return this.http.get<Products>(key).pipe(
      this.deserialize(Products),
      this.memoizeResult(key)
    );
  }

  /**
  * Fetches products from `/api/product/list/featured`.
  * @return observable of items
  */
  public featuredProducts(): Observable<Products> {
    const key: string = '/api/product/list/featured';
    if (this.hasMemo(key)) {
      return this.getMemoized(key);
    }

    return this.http.get<Products>(key).pipe(
        this.deserialize(Products),
        this.memoizeResult(key)
      );
  }

}
