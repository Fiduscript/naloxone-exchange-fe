import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

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
    HttpModule,
    ProductsRoutingModule,
    MarkdownModule.forRoot(markdownConfig)
  ],
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    ProductListComponent,
  ]
})
export class ProductsModule { }
