import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import * as _ from 'lodash';

import { ProductDetail } from './product-detail/model/product-detail';
import { ProductDetails } from './product-detail/model/product-details';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private memo: {[s: string]: any} = {};

  public constructor(private http: HttpClient) { }

  /**
   * Fetches products from `/api/product/list`.
   * @param page number of item for pagination
   * @return observable of items
   */
  public listProducts(pageNumber: number = 1): Observable<ProductDetails> {
    const key: string = '/api/product/list';
    if (this.memo[key] != null) {
      return of(this.memo[key]);
    }

    return this.http.get<ProductDetails>('/api/product/list').pipe(
        tap(_.bind((details: ProductDetails) => {
          details.items.forEach((item) => {
            const k = `/api/product/list/${item.id}`;
            this.memo[k] = item;
          });
          this.memo[key] = details;
        }, this)));
  }

  /**
   * Fetches a product's detail. If data is already available on the front end it will be
   * added here.
   */
  public getProduct(id: string): Observable<ProductDetail> {
    const key: string = `/api/product/list/${id}`;
    if (this.memo[key] != null) {
      return of(this.memo[key]);
    }

    return this.http.get<ProductDetail>(key).pipe(
      tap(_.bind((product: ProductDetail): void => {
        this.memo[key] = product;
      }, this)));
  }

}
