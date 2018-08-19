import { TestBed, inject } from '@angular/core/testing';

import { SupportedStatesService } from './supported-states.service';

describe('SupportedStatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportedStatesService]
    });
  });

  it('should be created', inject([SupportedStatesService], (service: SupportedStatesService) => {
    expect(service).toBeTruthy();
  }));
});
