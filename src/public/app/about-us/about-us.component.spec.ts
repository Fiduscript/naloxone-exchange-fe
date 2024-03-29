import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AboutUsComponent } from './about-us.component';
import { ContactComponent } from './contact/contact.component';
import { HistoryComponent } from './history/history.component';
import { MissionComponent } from './mission/mission.component';
import { OurSponsorsComponent } from './our-sponsors/our-sponsors.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { PortraitComponent } from './our-team/portrait/portrait.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          AboutUsComponent,
          ContactComponent,
          HistoryComponent,
          MissionComponent,
          OurSponsorsComponent,
          OurTeamComponent,
          PortraitComponent,
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/about-us'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
