import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './about-us.component';
import { MissionComponent } from './mission/mission.component';
import { HistoryComponent } from './history/history.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { OurSponsorsComponent } from './our-sponsors/our-sponsors.component';

const routes: Routes = [
  {path: 'about-us', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
