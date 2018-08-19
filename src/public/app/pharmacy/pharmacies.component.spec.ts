import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { PharmaciesComponent } from './pharmacies.component';
import { PharmacyListItemComponent } from './pharmacy-list-item/pharmacy-list-item.component';

describe('PharmaciesComponent', () => {
  let component: PharmaciesComponent;
  let fixture: ComponentFixture<PharmaciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PharmaciesComponent,
        PharmacyListItemComponent
      ],
      imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/pharmacy'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
