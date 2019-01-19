import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LOCATION } from '../util/window-injections';
import { AccountRoutingModule } from './account-routing.module';
import { AccountService } from './account.service';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterComponent } from './register/register.component';
import { AccountSettingsComponent } from './user/account-settings/account-settings.component';
import { AddressFormComponent } from './user/address-form/address-form.component';
import { AddressComponent } from './user/address/address.component';
import { AddressesComponent } from './user/addresses/addresses.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RelationFormComponent } from './user/relation-form/relation-form.component';
import { RelationComponent } from './user/relation/relation.component';
import { RelationsComponent } from './user/relations/relations.component';
import { UpdateAttributeComponent } from './user/update-attribute/update-attribute.component';
import { UpdatePasswordComponent } from './user/update-password/update-password.component';
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
    UserAuthGuard,
    {provide: LOCATION, useValue: window.location}
  ],
  entryComponents: [
    PrivacyComponent,
  ],
  declarations: [
    AccountSettingsComponent,
    AddressComponent,
    AddressesComponent,
    AddressFormComponent,
    ConfirmComponent,
    LoginComponent,
    LogoutComponent,
    OrdersComponent,
    PrivacyComponent,
    ProfileComponent,
    RegisterComponent,
    RegisterComponent,
    RelationComponent,
    RelationFormComponent,
    RelationsComponent,
    UpdateAttributeComponent,
    UpdatePasswordComponent,
  ]
})
export class AccountModule { }
