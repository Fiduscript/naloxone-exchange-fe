import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AccountService ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
