import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Ensures that two sibling form fields have the same value.
 */
export class MatchValidator implements Validator {
  private controlNameToCompare: string;
  private subscribed: boolean = false;

  public constructor(controlNameToCompare: string) {
    this.controlNameToCompare = controlNameToCompare;
  }

  public validate(c: AbstractControl): ValidationErrors | null {
    if (c.value == null || c.value.length === 0) {
      return null; // don't validate empty value
    }
    const controlToCompare = c.root.get(this.controlNameToCompare);
    if (controlToCompare == null) {
      throw new Error(`Control with name \`${this.controlNameToCompare}\` doesn't exit to compare to.`);
    }
    if (!this.subscribed) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
      });
      this.subscribed = true;
    }
    return controlToCompare.value !== c.value ? { 'compare': true } : null;
  }
}
