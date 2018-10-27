import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import * as _ from 'lodash';


export class StrongPasswordValidator implements Validator {
  private static readonly LOWERCASE = new RegExp('^(?=.*[a-z])');
  private static readonly UPPERCASE = new RegExp('^(?=.*[A-Z])');
  private static readonly NUMBER = new RegExp('^(?=.*[0-9])');
  private static readonly SPECIAL_CHARACTER = new RegExp('^(?=.*[!@#\$%\^&\*])');
  private static readonly LENGTH = new RegExp('^(?=.{8,})');

  public constuctor() {}

  public validate(c: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};
    if (!StrongPasswordValidator.LENGTH.test(c.value)) {
      errors.length = 'Must contain at least 8 characters.';
    }
    if (!StrongPasswordValidator.LOWERCASE.test(c.value)) {
      errors.lowerCase = 'Must contain at least one lowercase letter.';
    }
    if (!StrongPasswordValidator.UPPERCASE.test(c.value)) {
      errors.upperCase = 'Must contain at least one uppercase letter.';
    }
    if (!StrongPasswordValidator.NUMBER.test(c.value)) {
      errors.number = 'Must contain at least one number.';
    }
    if (!StrongPasswordValidator.SPECIAL_CHARACTER.test(c.value)) {
      errors.character = 'Must contain at least one special character.';
    }
    return _.isEmpty(errors) ? null : errors;
  }
}
