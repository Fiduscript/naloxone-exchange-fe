import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { HistoryComponent } from './history/history.component';
import { MissionComponent } from './mission/mission.component';
import { OurSponsorsComponent } from './our-sponsors/our-sponsors.component';
import { OurTeamComponent } from './our-team/our-team.component';

@NgModule({
  imports: [
    CommonModule,
		AboutUsRoutingModule
  ],
  declarations: [
    AboutUsComponent,
    MissionComponent,
    HistoryComponent,
    OurTeamComponent,
    OurSponsorsComponent
	]
})
export class AboutUsModule { }
