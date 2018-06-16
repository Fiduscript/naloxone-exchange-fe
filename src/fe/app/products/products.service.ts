import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

import { ProductDetail } from './model/product-detail';
import { ProductDetails } from './model/product-details';
import { jsonConvert } from '../util/json-convert-provider';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private memo: {[s: string]: any} = {
    // this is mocked data!
    "/api/product/list": new ProductDetails([
      new ProductDetail("abcdefg", "Naloxon Nasal Spray", ["detail 1", "detail 2", "detail 3", "detail 4"], "/assets/img/nasal-spray.png"),
      new ProductDetail("hijlkmm", "Naloxon Suppository", ["detail 1", "detail 2", "detail 3", "detail 4"], "/assets/img/nasal-spray.png"),
      new ProductDetail("nopqrstuv", "Naloxon Injection", ["detail 1", "detail 2", "detail 3", "detail 4"], "/assets/img/nasal-spray.png"),
      new ProductDetail("wxyz", "Naloxon Ear Muffs", ["detail 1", "detail 2", "detail 3", "detail 4"], "/assets/img/nasal-spray.png"),
      ])
  };

  public constructor(private http: Http) {
    this.memo["/api/product/list"].items.forEach(_.bind((item) => {
      let k = `/api/product/${item.id}`;
      this.memo[k] = item;
    }, this));
  }

  /**
   * Fetches products from `/api/product/list`.
   * @param page number of item for pagination
   * @return observable of items
   */
  public listProducts(pageNumber: number = 1): Observable<ProductDetails> {
    let key: string = "/api/product/list";
    if (this.memo[key] != null) {
      return Observable.of(this.memo[key]);
    }

    return this.http.get("/api/product/list")
        .map((response: Response): ProductDetails => {
          return jsonConvert.deserialize(response.json(), ProductDetails);
        }).do(_.bind((details: ProductDetails) => {
          details.items.forEach((item) => {
            let k = `/api/product/${item.id}`;
            this.memo[k] = item;
          });
          this.memo[key] = details;
        }, this));
  }

  /**
   * Fetches a product's detail. If data is already available on the front end it will be
   * added here.
   */
  public getProduct(id: string): Observable<ProductDetail> {
    let key: string = `/api/product/${id}`;
    if (this.memo[key] != null) {
      return Observable.of(this.memo[key]);
    }

    return this.http.get(key).map((response: Response): ProductDetail => {
      return jsonConvert.deserialize(response.json(), ProductDetail);
    }).do(_.bind((product: ProductDetail): void => {
      this.memo[key] = product;
    }, this));
  }

}
