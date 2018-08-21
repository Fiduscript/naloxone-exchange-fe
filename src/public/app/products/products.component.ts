import { Component, OnInit } from '@angular/core';

import { BuyService } from '../buy/buy.service';
import { Products } from '../buy/model/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.pug',
  styleUrls: ['./products.component.styl']
})
export class ProductsComponent implements OnInit {

  public products: Products;

  public constructor(
    private service: BuyService) { }

  public ngOnInit(): void {
    this.service.featuredProducts().subscribe((products: Products) => {
      this.products = products;
    });
  }

  public canRender(): boolean {
    return this.products != null;
  }

}
