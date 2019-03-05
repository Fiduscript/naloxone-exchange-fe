import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiduCommonModule } from '../common/fidu-common.module';
import { UpdateSubscriberModule } from '../update-subscriber/update-subscriber.module';
import { PurchaseOrderFormConfirmComponent } from './b2b/confirm/purchase-order-form-confirm.component';
import { PurchaseOrderFormComponent } from './b2b/purchase-order/purchase-order-form.component';
import { BuyByStateComponent } from './buy-by-state/buy-by-state.component';
import { BuyRoutingModule } from './buy-routing.module';
import { BuyComponent } from './buy.component';
import { BuyService } from './buy.service';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  imports: [
    BuyRoutingModule,
    CommonModule,
    FiduCommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UpdateSubscriberModule,
  ],
  declarations: [
    BuyComponent,
    BuyByStateComponent,
    ProductsComponent,
    ProductComponent,
    PurchaseOrderFormComponent,
    PurchaseOrderFormConfirmComponent
  ],
  providers: [
    BuyService
  ],
  exports: [
    ProductsComponent
  ]
})
export class BuyModule { }
