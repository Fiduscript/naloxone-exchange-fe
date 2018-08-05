import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurSponsorsComponent } from './our-sponsors.component';

describe('OurSponsorsComponent', () => {
  let component: OurSponsorsComponent;
  let fixture: ComponentFixture<OurSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
