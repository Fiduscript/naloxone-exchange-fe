import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import _ from 'lodash';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { jsonConvert } from '../util/json-convert-provider';
import { ProductDetail } from './product-detail/model/product-detail';
import { ProductDetails } from './product-detail/model/product-details';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private memo: {[s: string]: any} = {};

  public constructor(private http: Http) { }

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

    return this.http.get('/api/product/list').pipe(
        map((response: Response): ProductDetails => {
          return jsonConvert.deserialize(response.json(), ProductDetails);
        }),
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

    return this.http.get(key).pipe(
      map((response: Response): ProductDetail => {
        return jsonConvert.deserialize(response.json(), ProductDetail);
      }),
      tap(_.bind((product: ProductDetail): void => {
        this.memo[key] = product;
      }, this)));
  }

}
