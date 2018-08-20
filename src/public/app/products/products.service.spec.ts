import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));
});
