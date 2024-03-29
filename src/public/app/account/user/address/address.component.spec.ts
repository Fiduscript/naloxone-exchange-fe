import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddressFormComponent } from '../address-form/address-form.component';
import { AddressComponent } from './address.component';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddressComponent,
        AddressFormComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    component.address = {
      addressId: 'ADDY-456',
      userId: 'USER-123',
      name: 'Lewis Black c/o Amazon.com',
      state: 'Colorado',
      street: '551 boren ave N',
      street2: '',
      city: 'Seattle',
      zip: '98109',
      phoneNumber: '555-444-3333',
      weekendOkay: false,
      specialInstructions: 'Leave with amazon front desk.'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
