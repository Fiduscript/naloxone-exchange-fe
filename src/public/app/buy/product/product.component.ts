import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.pug',
  styleUrls: ['./product.component.styl']
})
export class ProductComponent implements OnInit {

  @Input() public product: Product;

  public constructor() { }

  public ngOnInit() {
  }

}
