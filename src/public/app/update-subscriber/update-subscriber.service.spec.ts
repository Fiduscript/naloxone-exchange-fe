import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { UpdateSubscriberService } from './update-subscriber.service';

describe('UpdateSubscriberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateSubscriberService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([UpdateSubscriberService], (service: UpdateSubscriberService) => {
    expect(service).toBeTruthy();
  }));
});
