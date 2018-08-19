import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyRoutingModule } from './buy-routing.module';
import { BuyComponent } from './buy.component';
import { IdComponent } from './id/id.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { SupportedComponent } from './supported/supported.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [
    CommonModule,
    BuyRoutingModule
  ],
  declarations: [
    BuyComponent,
    IdComponent,
    NotSupportedComponent,
    SupportedComponent,
    ProductsComponent
  ],
  exports: [
    IdComponent
  ]
})
export class BuyModule { }
