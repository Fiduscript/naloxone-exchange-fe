import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { LOCATION } from '../../../util/window-injections';
import { RelationFormComponent } from './relation-form.component';

describe('RelationFormComponent', () => {
  let component: RelationFormComponent;
  let fixture: ComponentFixture<RelationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelationFormComponent,
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        NgbDatepickerModule,
        NgbModalModule,
        ReactiveFormsModule,
      ],
      providers: [
        CookieService,
        {provide: LOCATION, useValue: {replace: (location: string) => {}}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
