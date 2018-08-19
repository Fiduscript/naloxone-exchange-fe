import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PharmaciesComponent } from './pharmacies.component';
import { PharmacyListItemComponent } from './pharmacy-list-item/pharmacy-list-item.component';
import { PharmacyRoutingModule } from './pharmacy-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PharmacyRoutingModule
  ],
  declarations: [
    PharmaciesComponent,
    PharmacyListItemComponent,
  ]
})
export class PharmacyModule { }
