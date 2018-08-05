import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './pharmacy.component';
import { OurPartnersComponent } from './our-partners/our-partners.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  	PharmacyComponent, 
  	OurPartnersComponent
  ]
})
export class PharmacyModule { }
