import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { BuyService } from './buy.service';

describe('BuyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BuyService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([BuyService], (service: BuyService) => {
    expect(service).toBeTruthy();
  }));
});
