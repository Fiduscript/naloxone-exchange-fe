import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [ UserService ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
