import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OurPartnersComponent } from './our-partners/our-partners.component';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyComponent } from './pharmacy.component';

@NgModule({
  imports: [
    CommonModule,
    PharmacyRoutingModule
  ],
  declarations: [
    PharmacyComponent,
    OurPartnersComponent
  ]
})
export class PharmacyModule { }
