import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyByStateComponent } from './buy-by-state/buy-by-state.component';
import { BuyComponent } from './buy.component';

const routes: Routes = [
  {path: 'buy', component: BuyComponent},
  {path: 'buy/:state', component: BuyByStateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyRoutingModule { }
