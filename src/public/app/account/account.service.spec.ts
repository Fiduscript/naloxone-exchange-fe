import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { LOCATION } from '../util/window-injections';
import { AccountService } from './account.service';

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LOCATION, useValue: {replace: (location: string) => {}}},
        AccountService,
        CookieService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
