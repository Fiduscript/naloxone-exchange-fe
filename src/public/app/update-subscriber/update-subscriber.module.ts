import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UpdateSubscriberComponent } from './update-subscriber.component';
import { UpdateSubscriberService } from './update-subscriber.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UpdateSubscriberComponent
  ],
  providers: [
    UpdateSubscriberService
  ],
  exports: [
    UpdateSubscriberComponent
  ]
})
export class UpdateSubscriberModule { }
