import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HONCHOS } from '../our-team.component';
import { PortraitComponent } from './portrait.component';

describe('PortraitComponent', () => {
  let component: PortraitComponent;
  let fixture: ComponentFixture<PortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortraitComponent);
    component = fixture.componentInstance;
    component.person = HONCHOS[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
