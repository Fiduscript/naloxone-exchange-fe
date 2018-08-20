import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { PharmacyService } from './pharmacy.service';

describe('PharmacyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PharmacyService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([PharmacyService], (service: PharmacyService) => {
    expect(service).toBeTruthy();
  }));
});
