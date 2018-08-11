import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './pharmacy.component';
import { NgModule } from '@angular/core';

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
