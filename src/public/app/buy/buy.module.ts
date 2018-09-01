import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { UpdateSubscriberModule } from '../update-subscriber/update-subscriber.module';
import { BuyByStateComponent } from './buy-by-state/buy-by-state.component';
import { BuyRoutingModule } from './buy-routing.module';
import { BuyComponent } from './buy.component';
import { BuyService } from './buy.service';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [
    AngularFontAwesomeModule,
    BuyRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UpdateSubscriberModule,
  ],
  declarations: [
    BuyComponent,
    BuyByStateComponent,
    ProductsComponent,
    ProductComponent
  ],
  providers: [
    BuyService
  ],
  exports: [
    ProductsComponent
  ]
})
export class BuyModule { }
