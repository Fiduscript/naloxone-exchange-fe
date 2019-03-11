import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { expect } from '@angular/core/testing/src/testing_internal';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserService ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
