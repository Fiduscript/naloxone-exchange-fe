import { Component, Input, OnInit } from '@angular/core';

import { ProductDetail } from '../model/product-detail';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.pug',
  styleUrls: ['../products.component.styl']
})
export class ProductListComponent implements OnInit {

  @Input()
  public product: ProductDetail = undefined;

  public constructor() {
  }

  public ngOnInit(): void {

  }

  public canRender(): boolean {
    return this.product != null;
  }
}
