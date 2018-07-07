import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service';
import { ProductDetails } from './product-detail/model/product-details';

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
