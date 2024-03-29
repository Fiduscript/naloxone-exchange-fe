import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pharmacy } from '../model/pharmacy';
import { PharmacyListItemComponent } from './pharmacy-list-item.component';

describe('PharmacyListItemComponent', () => {
  let component: PharmacyListItemComponent;
  let fixture: ComponentFixture<PharmacyListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PharmacyListItemComponent
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyListItemComponent);
    component = fixture.componentInstance;
    component.pharmacy = new Pharmacy();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
