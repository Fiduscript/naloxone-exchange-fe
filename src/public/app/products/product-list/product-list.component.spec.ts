import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { ProductDetail } from '../product-detail/model/product-detail';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {

  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductListComponent
      ],
      imports: [
        BrowserModule,
        HttpModule,
        MarkdownModule.forRoot(),
        RouterModule.forRoot([])
      ], providers: [
        {provide: APP_BASE_HREF, useValue: '/products'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.product = new ProductDetail();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
