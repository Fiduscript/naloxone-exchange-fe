import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductListComponent,
  ]
})
export class ProductsModule { }
