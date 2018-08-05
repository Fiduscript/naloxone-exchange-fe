import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionComponent } from './mission/mission.component';
import { HistoryComponent } from './history/history.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { OurSponsorsComponent } from './our-sponsors/our-sponsors.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';

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
