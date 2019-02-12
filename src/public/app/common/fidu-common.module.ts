import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressFormComponent } from './form/address-form/address-form.component';
import { FreeFormDropdownComponent } from './form/free-form-dropdown/free-form-dropdown.component';

@NgModule({
  declarations: [
    AddressFormComponent,
    FreeFormDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddressFormComponent,
    FreeFormDropdownComponent
  ]
})
export class FiduCommonModule { }
