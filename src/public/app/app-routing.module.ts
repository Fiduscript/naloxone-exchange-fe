import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { OverdoseComponent } from './overdose/overdose.component';

const routes: Routes = [
  {path: 'overdose', component: OverdoseComponent}
  {path: 'contact', component: ContactComponent},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
