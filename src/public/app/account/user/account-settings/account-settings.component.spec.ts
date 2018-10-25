import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfo } from '../../model/user-info';
import { AccountSettingsComponent } from './account-settings.component';

const TEST_USER: UserInfo = new UserInfo('Test Name', 'test@test.com');

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsComponent ]
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
