import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';

import { ProductsService } from '../products.service';
import { ProductDetail } from '../product-detail/model/product-detail';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.pug',
  styleUrls: ['../products.component.styl']
})
export class ProductListComponent implements OnInit {

  @Input()
  public product: ProductDetail = undefined;

  public constructor(
    private service: ProductsService) {
  }

  public ngOnInit(): void {

  }

  public canRender(): boolean {
    return this.product != null;
  }
}
