import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTeamComponent } from './our-team.component';
import { PortraitComponent } from './portrait/portrait.component';

describe('OurTeamComponent', () => {
  let component: OurTeamComponent;
  let fixture: ComponentFixture<OurTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OurTeamComponent,
        PortraitComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
