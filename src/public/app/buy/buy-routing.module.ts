import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchaseOrderFormConfirmComponent } from './b2b/confirm/purchase-order-form-confirm.component';
import { PurchaseOrderFormComponent } from './b2b/purchase-order/purchase-order-form.component';
import { BuyByStateComponent } from './buy-by-state/buy-by-state.component';
import { BuyComponent } from './buy.component';

const routes: Routes = [
  {path: 'buy', component: BuyComponent},
  {path: 'buy/b2b', component: PurchaseOrderFormComponent},
  {path: 'buy/:state', component: BuyByStateComponent},
  {path: 'buy/b2b/confirm/:orderId', component: PurchaseOrderFormConfirmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyRoutingModule { }
