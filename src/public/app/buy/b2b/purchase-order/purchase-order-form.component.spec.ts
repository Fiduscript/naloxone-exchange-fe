import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BuyService } from '../../buy.service';
import { PurchaseOrderFormComponent } from './purchase-order-form.component';

describe('PurchaseOrderFormComponent', () => {
  let buyService: BuyService;
  let component: PurchaseOrderFormComponent;
  let fixture: ComponentFixture<PurchaseOrderFormComponent>;

  const MOCK_PRODUCTS = {
    items: [
      {
        Product: {
          id: 'narcan-1'
        }
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrderFormComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        BuyService
      ],
    })
      .compileComponents();
    buyService = TestBed.get(BuyService);
    spyOn(buyService, 'featuredProducts').and.returnValue(of(MOCK_PRODUCTS));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
