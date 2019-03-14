import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './about-us/contact/contact.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {path: 'training', component: TrainingComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
