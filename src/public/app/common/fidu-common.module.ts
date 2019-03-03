import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FreeFormDropdownComponent } from './form/free-form-dropdown/free-form-dropdown.component';

@NgModule({
  declarations: [
    FreeFormDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FreeFormDropdownComponent
  ]
})
export class FiduCommonModule { }
