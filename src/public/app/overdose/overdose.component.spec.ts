import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdoseComponent } from './overdose.component';

describe('OverdoseComponent', () => {
  let component: OverdoseComponent;
  let fixture: ComponentFixture<OverdoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverdoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
