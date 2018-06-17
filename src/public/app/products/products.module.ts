import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ProductsRoutingModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductListComponent,
  ]
})
export class ProductsModule { }
