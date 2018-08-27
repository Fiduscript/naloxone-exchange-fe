import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { UpdateSubscriberModule } from '../../update-subscriber/update-subscriber.module';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from '../products/products.component';
import { BuyByStateComponent } from './buy-by-state.component';

describe('BuyByStateComponent', () => {
  let component: BuyByStateComponent;
  let fixture: ComponentFixture<BuyByStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MarkdownModule.forRoot(),
        RouterModule.forRoot([]),
        UpdateSubscriberModule
      ],
      declarations: [
        BuyByStateComponent,
        ProductComponent,
        ProductsComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/buy/Alabama'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
