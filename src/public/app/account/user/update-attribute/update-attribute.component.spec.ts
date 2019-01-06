import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { LOCATION } from '../../../util/window-injections';
import { UpdateAttributeComponent } from './update-attribute.component';

describe('UpdateAttributeComponent', () => {
  let component: UpdateAttributeComponent;
  let fixture: ComponentFixture<UpdateAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAttributeComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        {provide: LOCATION, useValue: {replace: (location: string) => {}}},
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAttributeComponent);
    component = fixture.componentInstance;
    component.attributeName = 'email';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
