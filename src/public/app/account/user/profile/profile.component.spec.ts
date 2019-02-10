import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { LOCATION } from '../../../util/window-injections';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { AddressComponent } from '../address/address.component';
import { AddressesComponent } from '../addresses/addresses.component';
import { OrdersComponent } from '../orders/orders.component';
import { RelationsComponent } from '../relations/relations.component';
import { UpdateAttributeComponent } from '../update-attribute/update-attribute.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        AccountSettingsComponent,
        AddressesComponent,
        AddressComponent,
        AddressFormComponent,
        OrdersComponent,
        RelationsComponent,
        UpdateAttributeComponent,
        UpdatePasswordComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        {provide: LOCATION, useValue: {replace: (location: string) => {}}},
        CookieService
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
