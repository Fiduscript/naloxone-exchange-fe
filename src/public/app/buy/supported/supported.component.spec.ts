import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedComponent } from './supported.component';

describe('SupportedComponent', () => {
  let component: SupportedComponent;
  let fixture: ComponentFixture<SupportedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
