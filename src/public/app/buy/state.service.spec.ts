import { StateService } from './state.service';
import { TestBed, inject } from '@angular/core/testing';

describe('StateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateService]
    });
  });

  it('should be created', inject([StateService], (service: StateService) => {
    expect(service).toBeTruthy();
  }));
});
