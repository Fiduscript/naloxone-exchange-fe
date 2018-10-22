import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserAuthGuard } from './user/user-auth.guard';

const routes: Routes = [
  { path: 'account/login', component: LoginComponent },
  { path: 'account/user/profile', canActivate: [ UserAuthGuard ], component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
