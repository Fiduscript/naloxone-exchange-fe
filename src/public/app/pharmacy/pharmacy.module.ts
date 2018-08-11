import { CommonModule } from '@angular/common';
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
  ]
})
export class PharmacyModule { }
