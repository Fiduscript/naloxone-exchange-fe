
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FreeFormDropdownComponent } from './free-form-dropdown.component';

describe('FreeFormDropdownComponent', () => {
  let component: FreeFormDropdownComponent;
  let fixture: ComponentFixture<FreeFormDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FreeFormDropdownComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeFormDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
