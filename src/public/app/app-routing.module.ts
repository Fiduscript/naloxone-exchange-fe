import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {AboutComponent} from './about/about.component';
import { OverdoseComponent } from './overdose/overdose.component';

const routes: Routes = [
  {path: 'overdose', component: OverdoseComponent},
  {path: 'about', component: AboutComponent},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
