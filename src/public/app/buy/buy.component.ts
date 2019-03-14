import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IState, STATES } from '../../../common/constant/states';

enum REASON_TYPE {
  BUSINESS,
  PERSONAL,
}

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.pug',
  styleUrls: ['./buy.component.styl']
})
export class BuyComponent {

  private static readonly REASONS: Object = {
    'Self or Other Person': REASON_TYPE.PERSONAL,
    'Organization or Business': REASON_TYPE.BUSINESS
  };

  private static readonly VALID_STATES: string[] = [
    'Texas',
  ];


  public form: FormGroup;

  public constructor(
      private fb: FormBuilder,
      private router: Router) {
    this.form = fb.group({
      'reason': ['', [Validators.required]],
      'state': ['Texas', [Validators.required]],
    });
  }

  public getStates(): IState[] {
    return STATES;
  }

  public getReasons(): string[] {
    return Object.keys(BuyComponent.REASONS);
  }

  private getReasonType(reason: string) {
    return BuyComponent.REASONS[reason];
  }

  public navigate(): void {
    if (this.form.invalid) { return; }

    if (this.getReasonType(this.form.get('reason').value) === REASON_TYPE.BUSINESS
      && BuyComponent.VALID_STATES.includes(this.form.get('state').value)) {
      this.router.navigate(['buy/b2b']);
    } else {
      this.router.navigate(['buy', this.form.get('state').value]);
    }
  }

}
