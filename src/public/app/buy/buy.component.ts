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

  public getStates(): IState[] {
    return STATES;
  }

  public getReasons(): string[] {
    return BuyComponent.REASONS;
  }

  public navigate(): void {
    this.router.navigate(['buy', this.form.get('state').value]);
  }

}
