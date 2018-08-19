import { CommonModule } from '@angular/common';
import { BuyComponent } from './buy.component';
import { BuyRoutingModule } from './buy-routing.module';
import { IdComponent } from './id/id.component';
import { NgModule } from '@angular/core';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { ProductComponent } from './product/product.component';
import { SupportedComponent } from './supported/supported.component';

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
    ProductComponent
  ],
  exports: [
    IdComponent
  ]
})
export class BuyModule { }
