import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialLoginModule,
} from 'angular-6-social-login';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';

// Configs for social login
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('408708556330017') // Facebook-app-id
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('373871729938-bk23ue6r5fr5n8dl1val88dud3mp9cve.apps.googleusercontent.com') // Google-Client-Id
        }
      ]);
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  declarations: [LoginComponent]
})
export class AccountModule { }
