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

  public products: Products;
  @Input() public state: string = null;
  @Input() public thumbnail: boolean = false;

  public constructor(private service: BuyService) {
    this.setProducts = this.setProducts.bind(this);
  }

  public canRender(): boolean {
    return this.products != null;
  }

  public ngOnInit() {
    if (_.isEmpty(this.state)) {
      this.service.featuredProducts().subscribe(this.setProducts);
    } else {
      this.service.stateProducts(this.state).subscribe(this.setProducts);
    }
  }

  private setProducts(products: Products): void {
    this.products = products;
  }
}
