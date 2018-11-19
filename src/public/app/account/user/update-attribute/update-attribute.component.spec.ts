import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttributeComponent } from './update-attribute.component';

describe('UpdateAttributeComponent', () => {
  let component: UpdateAttributeComponent;
  let fixture: ComponentFixture<UpdateAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
