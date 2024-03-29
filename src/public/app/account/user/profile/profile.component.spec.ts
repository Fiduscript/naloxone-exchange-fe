import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CookieService } from 'ngx-cookie-service';
import { FiduCommonModule } from 'src/public/app/common/fidu-common.module';
import { LOCATION } from '../../../util/window-injections';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { AddressComponent } from '../address/address.component';
import { AddressesComponent } from '../addresses/addresses.component';
import { OrdersComponent } from '../orders/orders.component';
import { RelationFormComponent } from '../relation-form/relation-form.component';
import { RelationComponent } from '../relation/relation.component';
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
        AccountSettingsComponent,
        AddressComponent,
        AddressesComponent,
        AddressFormComponent,
        OrdersComponent,
        ProfileComponent,
        RelationComponent,
        RelationFormComponent,
        RelationsComponent,
        UpdateAttributeComponent,
        UpdatePasswordComponent,
      ],
      imports: [
        FiduCommonModule,
        FormsModule,
        NgbDatepickerModule,
        NgbModalModule,
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
