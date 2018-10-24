import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

export function compareValidator(controlNameToCompare: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0) {
      return null; // don't validate empty value
    }
    const controlToCompare = c.root.get(controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;
  };
}

export function strongPassword(): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const lowerCase = new RegExp('^(?=.*[a-z])');
    const upperCase = new RegExp('^(?=.*[A-Z])');
    const number = new RegExp('^(?=.*[0-9])');
    const character = new RegExp('^(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('^(?=.{8,})');
    const checkPassword = {
      lowerCase: false,
      upperCase: false,
      number: false,
      character: false,
      length: false
    };
    if (!lowerCase.test(c.value)) {
      checkPassword.lowerCase = true;
    }
    if (!upperCase.test(c.value)) {
      checkPassword.upperCase = true;
    }
    if (!number.test(c.value)) {
      checkPassword.number = true;
    }
    if (!character.test(c.value)) {
      checkPassword.character = true;
    }
    if (!length.test(c.value)) {
      checkPassword.length = true;
    }

    if (!checkPassword.lowerCase
      && !checkPassword.upperCase
      && !checkPassword.number
      && !checkPassword.character
      && !checkPassword.length) {
      return null;
    } else {
      return checkPassword;
    }
  };
}
