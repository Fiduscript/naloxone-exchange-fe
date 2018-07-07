import { Component, OnInit } from '@angular/core';

import { ProductDetails } from './model/product-details';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.pug',
  styleUrls: ['./products.component.styl']
})
export class ProductsComponent implements OnInit {

  private products: ProductDetails;

  public constructor(
    private service: ProductsService) { }

  public ngOnInit(): void {
    this.service.listProducts().subscribe((products: ProductDetails) => {
      this.products = products;
    });
  }

  public canRender(): boolean {
    return this.products != null;
  }

}
