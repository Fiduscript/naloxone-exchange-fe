import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PharmacyComponent } from './pharmacy.component';
import { OurPartnersComponent } from './our-partners/our-partners.component';

const routes: Routes = [
  {path: 'pharmacy', component: PharmacyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }
