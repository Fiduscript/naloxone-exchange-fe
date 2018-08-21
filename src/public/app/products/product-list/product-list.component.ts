import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../buy/model/product';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.pug',
  styleUrls: ['../products.component.styl']
})
export class ProductListComponent implements OnInit {

  @Input()
  public product: Product = undefined;

  public constructor() {
  }

  public ngOnInit(): void {

  }

  public canRender(): boolean {
    return this.product != null;
  }
}
