import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubscriberComponent } from './update-subscriber.component';

describe('UpdateSubscriberComponent', () => {
  let component: UpdateSubscriberComponent;
  let fixture: ComponentFixture<UpdateSubscriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSubscriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
