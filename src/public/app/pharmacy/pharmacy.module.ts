import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PharmacyListItemComponent } from './pharmacy-list-item/pharmacy-list-item.component';
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyComponent } from './pharmacy.component';

@NgModule({
  imports: [
    CommonModule,
    PharmacyRoutingModule
  ],
  declarations: [
    PharmacyComponent,
    PharmacyListItemComponent,
  ]
})
export class PharmacyModule { }
