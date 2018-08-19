import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { UpdateSubscriberService } from './update-subscriber.service';

describe('UpdateSubscriberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateSubscriberService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([UpdateSubscriberService], (service: UpdateSubscriberService) => {
    expect(service).toBeTruthy();
  }));
});
