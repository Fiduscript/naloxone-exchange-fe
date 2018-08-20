import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { PharmacyService } from './pharmacy.service';

describe('PharmacyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PharmacyService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([PharmacyService], (service: PharmacyService) => {
    expect(service).toBeTruthy();
  }));
});
