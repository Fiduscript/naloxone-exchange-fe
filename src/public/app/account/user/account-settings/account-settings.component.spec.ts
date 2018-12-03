import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { UserInfo } from '../../model/user-info';
import { UpdateAttributeComponent } from '../update-attribute/update-attribute.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { AccountSettingsComponent } from './account-settings.component';

const TEST_USER: UserInfo = new UserInfo();

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountSettingsComponent,
        UpdateAttributeComponent,
        UpdatePasswordComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    component.user = TEST_USER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
