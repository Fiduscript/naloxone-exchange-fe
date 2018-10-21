import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { AddressesComponent } from '../addresses/addresses.component';
import { OrdersComponent } from '../orders/orders.component';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { RelationsComponent } from '../relations/relations.component';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        AddressesComponent,
        OrdersComponent,
        PersonalInfoComponent,
        RelationsComponent
      ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
