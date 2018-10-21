import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AddressesComponent } from './user/addresses/addresses.component';
import { OrdersComponent } from './user/orders/orders.component';
import { PersonalInfoComponent } from './user/personal-info/personal-info.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RelationsComponent } from './user/relations/relations.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    LoginService
  ],
  declarations: [
    LoginComponent,
    ProfileComponent,
    AddressesComponent,
    PersonalInfoComponent,
    RelationsComponent,
    OrdersComponent
  ]
})
export class AccountModule { }
