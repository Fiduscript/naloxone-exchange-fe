import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { BuyService } from './buy.service';

describe('BuyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BuyService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([BuyService], (service: BuyService) => {
    expect(service).toBeTruthy();
  }));
});
