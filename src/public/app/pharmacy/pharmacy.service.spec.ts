import { TestBed, inject } from '@angular/core/testing';

import { PharmacyService } from './pharmacy.service';

describe('PharmacyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PharmacyService]
    });
  });

  it('should be created', inject([PharmacyService], (service: PharmacyService) => {
    expect(service).toBeTruthy();
  }));
});
