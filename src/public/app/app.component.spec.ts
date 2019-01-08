import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { AccountModule } from './account/account.module';
import { AppComponent } from './app.component';
import { MockComponent } from './util/mock-component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent.mock({selector: 'app-update-subscriber'}),
      ],
      imports: [
        AccountModule,
        NgbModule,
        RouterModule.forRoot([]),
        ShareButtonsModule.forRoot(),
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: ''}
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
