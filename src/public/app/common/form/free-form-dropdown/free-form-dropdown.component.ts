import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-free-form-dropdown',
  templateUrl: './free-form-dropdown.component.pug',
  styleUrls: ['./free-form-dropdown.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FreeFormDropdownComponent)}
  ]
})
export class FreeFormDropdownComponent implements OnInit, ControlValueAccessor {
  private static readonly DEBOUNCE_KEYDOWN_MILLIS: number = 300;

  public form: FormGroup;
  @Input() public label: string;
  @Input() public name: string;
  @Input() public options: string[];
  public readonly OTHER: string = 'Other';
  public otherSelected: boolean = false;

  private propagateChange: (value: string) => void = _.identity();
  private propagateTouched: (value: string) => void = _.identity();
  private value: string = '';

  public constructor(private fb: FormBuilder) {
    this.otherTextChanged = _.debounce(
        this.otherTextChanged.bind(this),
        FreeFormDropdownComponent.DEBOUNCE_KEYDOWN_MILLIS);
  }

  public ngOnInit(): void {
    this.otherSelected = !_.isEmpty(this.value) && !this.options.includes(this.value);

    this.form = this.fb.group( {
      option: [this.otherSelected ? this.OTHER : this.value, Validators.required],
      other: [this.value, Validators.required],
    });
  }

  public onChange(): void {
    const val = this.form.get('option').value;
    this.otherSelected = val === this.OTHER;

    if (this.otherSelected) {
      this.value = this.form.get('other').value;
    } else {
      this.value = this.form.get('option').value;
    }

    this.propagateChange(this.value);
  }

  public onTouch(): void {
    this.propagateTouched(this.value);
  }

  public otherTextChanged() {
    this.value = this.form.get('other').value;
    this.propagateChange(this.value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: (value: string) => void): void {
    this.propagateTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public writeValue(value: string): void {
    if (value != null) {
      this.value = value;
      this.internalSet();
    }
  }

  private internalSet() {
    this.otherSelected = !_.isEmpty(this.value) && !this.options.includes(this.value);
    this.form.setValue({
      option: this.otherSelected ? this.OTHER : this.value,
      other: this.value
    });
  }
}
