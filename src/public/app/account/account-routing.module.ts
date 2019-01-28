import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmComponent } from './confirm/confirm.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { OauthComponent } from './oauth/oauth.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserAuthGuard } from './user/user-auth.guard';

const routes: Routes = [
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent},
  { path: 'account/confirm', component: ConfirmComponent},
  { path: 'account/logout', component: LogoutComponent },
  { path: 'account/user/profile', canActivate: [ UserAuthGuard ], component: ProfileComponent },
  { path: 'oauth/signin', component: OauthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
