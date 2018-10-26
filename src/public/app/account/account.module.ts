import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './account.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AccountSettingsComponent } from './user/account-settings/account-settings.component';
import { AddressesComponent } from './user/addresses/addresses.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RelationsComponent } from './user/relations/relations.component';
import { UserAuthGuard } from './user/user-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AccountService,
    UserAuthGuard
  ],
  declarations: [
    LoginComponent,
    ProfileComponent,
    AccountSettingsComponent,
    AddressesComponent,
    RelationsComponent,
    RegisterComponent,
    OrdersComponent,
    RegisterComponent,
    LogoutComponent,
  ]
})
export class AccountModule { }
