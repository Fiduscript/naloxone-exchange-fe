import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';

@NgModule({
  imports: [
    CommonModule,
    FaqRoutingModule
  ],
  declarations: [FaqComponent]
})
export class FaqModule { }
