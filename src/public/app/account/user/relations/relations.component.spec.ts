import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationFormComponent } from '../relation-form/relation-form.component';
import { RelationComponent } from '../relation/relation.component';
import { RelationsComponent } from './relations.component';

describe('RelationsComponent', () => {
  let component: RelationsComponent;
  let fixture: ComponentFixture<RelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelationsComponent,
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
    fixture = TestBed.createComponent(RelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
