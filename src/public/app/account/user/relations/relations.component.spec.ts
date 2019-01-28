import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { RelationFormComponent } from '../relation-form/relation-form.component';
import { RelationComponent } from '../relation/relation.component';
import { RelationsComponent } from './relations.component';

describe('RelationsComponent', () => {
  let component: RelationsComponent;
  let fixture: ComponentFixture<RelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelationComponent,
        RelationFormComponent,
        RelationsComponent,
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        NgbDatepickerModule,
        NgbModalModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
