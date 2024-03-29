import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { PharmacyService } from './pharmacy.service';

describe('PharmacyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PharmacyService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([PharmacyService], (service: PharmacyService) => {
    expect(service).toBeTruthy();
  }));
});
