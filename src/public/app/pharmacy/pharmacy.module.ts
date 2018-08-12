import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { PharmacyComponent } from './pharmacy.component';
import { PharmacyListItemComponent } from './pharmacy-list-item/pharmacy-list-item.component';

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
