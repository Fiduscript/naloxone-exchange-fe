import { Directive } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appCustomValidators]'
})
export class CustomValidatorsDirective implements Validators {
  private static readonly emailRegexExp = RegExp(/^[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+\.[a-zA-Z0–9]+$/);
  private static readonly usPhoneNumberRegex = RegExp(/^\(?([0-9]{3})\)?[\s-]?([0-9]{3})[\s-]?[0-9]{4}$/);

  static email(control: FormControl): ValidationErrors {
    if (!control.value) {
      return {email: 'Email is empty'};
    }

    if (control.value.length > 200) {
      return {email: 'Email is too long'};
    }
    if (!CustomValidatorsDirective.emailRegexExp.test(control.value)) {
      return {email: 'Email is not valid'};
    }

    return null;
  }

  static usPhoneNumber(control: FormControl): ValidationErrors {
    if (!control.value) {
      return {email: 'Phone number is empty'};
    }

    if (!CustomValidatorsDirective.usPhoneNumberRegex.test(control.value)) {
      return {phoneNumber: 'Phone number is not valid'};
    }

    return null;
  }

}
