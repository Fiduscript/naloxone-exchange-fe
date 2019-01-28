import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';

import { RELATIONS, UserRelation } from '../model/user-relation';
import { RelationFormComponent } from '../relation-form/relation-form.component';
import { RelationComponent } from './relation.component';

describe('RelationComponent', () => {
  let component: RelationComponent;
  let fixture: ComponentFixture<RelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelationComponent,
        RelationFormComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationComponent);
    component = fixture.componentInstance;
    component.relation = new UserRelation({
        id: '2',
        narcanAllergy: false,
        birthDate: moment(),
        name: 'Andrea',
        biologicalSex: 'female',
        medicalConditions: [],
        allergies: [],
        relation: RELATIONS[1]});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
