import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IState, STATES } from '../../../common/constant/states';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.pug',
  styleUrls: ['./buy.component.styl']
})
export class BuyComponent {

  private static readonly REASONS: string[] = [
      'Self',
      'Family member',
      'Friend',
      'Loved One',
      'Community center or business location',
      'EMS Responders',
      'Police Precinct',
      'Fire Department',
      'Prefer not to answer'];

  public form: FormGroup;

  public constructor(
      private fb: FormBuilder,
      private router: Router) {
    this.form = fb.group({
      'reason': ['', [Validators.required]],
      'state': ['', [Validators.required]],
    });
  }

  public getReasons(): string[] {
    return BuyComponent.REASONS;
  }

  public getStates(): IState[] {
    return STATES;
  }

  public navigate(): void {
    if (this.form.invalid) { return; }
    this.router.navigate(['buy', this.form.get('state').value]);
  }

}
