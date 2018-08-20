import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyComponent } from './buy.component';
import { IdComponent } from './id/id.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import { SupportedComponent } from './supported/supported.component';

const routes: Routes = [
  {path: 'buy', component: BuyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyRoutingModule { }
