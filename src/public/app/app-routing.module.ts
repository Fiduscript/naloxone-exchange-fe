import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './about-us/contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'training', component: TrainingComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
