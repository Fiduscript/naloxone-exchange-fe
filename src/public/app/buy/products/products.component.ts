import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { BuyService } from '../buy.service';
import { Products } from '../model/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.pug',
  styleUrls: ['./products.component.styl']
})
export class ProductsComponent implements OnInit {

  @Input() public state: string = null;
  @Input() public thumbnail: boolean = false;

  public products: Products;

  public constructor(
      private service: BuyService) { }

  public ngOnInit() {
    if (_.isEmpty(this.state)) {
      this.service.featuredProducts().subscribe(this.setProducts);
    } else {
      this.service.stateProducts(this.state).subscribe(this.setProducts);
    }
  }

  public canRender(): boolean {
    return this.products != null;
  }

  private setProducts(products: Products): void {
    this.products = products;
  }
}
