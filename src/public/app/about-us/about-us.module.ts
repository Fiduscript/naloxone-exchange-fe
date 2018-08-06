import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { ContactComponent } from './contact/contact.component';
import { HistoryComponent } from './history/history.component';
import { MissionComponent } from './mission/mission.component';
import { OurSponsorsComponent } from './our-sponsors/our-sponsors.component';
import { OurTeamComponent } from './our-team/our-team.component';

@NgModule({
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AboutUsComponent,
    ContactComponent,
    MissionComponent,
    HistoryComponent,
    OurTeamComponent,
    OurSponsorsComponent
  ],
  exports: [
    ContactComponent
  ]
})
export class AboutUsModule { }
