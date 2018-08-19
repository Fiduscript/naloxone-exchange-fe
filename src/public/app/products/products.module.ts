import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

const markdownConfig = {
  markedOptions: {
    provide: MarkedOptions,
    useValue: {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    },
  },
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductsRoutingModule,
    MarkdownModule.forRoot(markdownConfig)
  ],
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductListComponent,
  ],
  exports: [
  ]
})
export class ProductsModule { }
