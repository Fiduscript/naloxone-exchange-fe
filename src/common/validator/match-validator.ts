import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Ensures that two sibling form fields have the same value.
 */
export class MatchValidator implements Validator {
  private controNameToCompare: string;

  public constructor(controNameToCompare: string) {
       this.controNameToCompare = controNameToCompare;
  }

 public validate(c: AbstractControl): ValidationErrors | null {
   if (c.value == null || c.value.length === 0) {
    return null; // don't validate empty value
  }
  const controlToCompare = c.root.get(this.controNameToCompare);
  if (controlToCompare) {
    const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
      c.updateValueAndValidity();
      subscription.unsubscribe();
    });
  }
  return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;
  }
}
