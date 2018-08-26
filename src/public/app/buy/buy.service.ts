import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { jsonConvert } from '../util/json-convert-provider';
import { Products } from './model/products';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  private productsMemo: {[s: string]: Products} = {};

  public constructor(private http: HttpClient) {
    this.memoizeProducts = this.memoizeProducts.bind(this);
  }

  /**
   * Fetches products from `/api/product/list/state/:state` that are avaialble in a particular state
   * @param state the name of the state in question
   * @return observable of Products
   */
  public stateProducts(state: string): Observable<Products> {
    const key: string = `/api/product/list/state/${state}`;
    if (this.productsMemo[key] != null) {
      return of(this.productsMemo[key]);
    }
    return this.http.get<Products>(key).pipe(
      map(this.mapProducts),
      tap(_.partial(this.memoizeProducts, key))
    );
  }

  /**
  * Fetches products from `/api/product/list/featured`.
  * @return observable of items
  */
  public featuredProducts(): Observable<Products> {
    const key: string = '/api/product/list/featured';
    if (this.productsMemo[key] != null) {
      return of(this.productsMemo[key]);
     }
    return this.http.get<Products>(key).pipe(
        map(this.mapProducts),
        tap(_.partial(this.memoizeProducts, key))
      );
  }

  private memoizeProducts(key: string, products: Products): void {
     this.productsMemo[key] = products;
  }

  private mapProducts(products: Products): Products {
    return jsonConvert.deserialize(products, Products);
  }

}
