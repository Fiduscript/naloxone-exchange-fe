import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './pharmacy.component';
import { OurPartnersComponent } from './our-partners/our-partners.component';
import { PharmacyRoutingModule } from './pharmacy-routing.module';

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

