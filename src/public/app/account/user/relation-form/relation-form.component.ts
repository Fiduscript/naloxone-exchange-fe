import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment';
import { v4 as uuid } from 'uuid';

import { ErrorMessage } from 'src/public/app/common/message-response';
import { MomentRangeValidator } from 'src/public/app/util/moment-utils';
import { AccountService } from '../../account.service';
import { UserInfo } from '../../model/user-info';
import { IUserRelation, RELATIONS, UserRelation } from '../model/user-relation';
import { UserService } from '../user.service';

@Component({
  selector: 'app-relation-form',
  templateUrl: './relation-form.component.pug',
  styleUrls: ['./relation-form.component.styl']
})
export class RelationFormComponent implements OnInit {
  private static readonly EARLIEST_AGE: Moment = moment().subtract(100, 'years').startOf('month');
  private static readonly LATEST_AGE: Moment = moment().startOf('month');

  private static readonly NARCAN_ALLERGY_INDICATOR: string = 'This patient has an allergy to Naloxone, Evzio, or Narcan.';

  public editingExisting: boolean = false;
  public error?: ErrorMessage = null;
  public form: FormGroup;
  public name: string = '';
  @Input() public relation: IUserRelation = {} as IUserRelation;
  @Input() public successCallback: () => {};

  private user: UserInfo = new UserInfo();

  public constructor(
    private fb: FormBuilder,
    private service: UserService,
    private accountService: AccountService) { }

  public addFormArrayElement(formControlName: string): void {
    (this.form.get(formControlName) as FormArray).push(this.fb.control(''));
  }

  public getRelations(): string[] {
    return Object.keys(RELATIONS);
  }

  public ngOnInit(): void {
    this.editingExisting = !_.isEmpty(this.relation.relation);
    this.accountService.whoami().subscribe((user: UserInfo) => {
      this.user = user;
    });

    const momentValidator = new MomentRangeValidator('MMM YYYY',
        RelationFormComponent.EARLIEST_AGE,
        RelationFormComponent.LATEST_AGE);

    const medicalConditions: FormControl[] = (this.relation.medicalConditions || []).map((v) => this.fb.control(v));
    this.seedEmptyFormArray(medicalConditions);

    const narcanAllergy: string = (this.relation.allergies || []).includes(RelationFormComponent.NARCAN_ALLERGY_INDICATOR) + '';
    const allergies: FormControl[] = _(this.relation.allergies || [])
        .reject((v) => v === RelationFormComponent.NARCAN_ALLERGY_INDICATOR)
        .map((v) => this.fb.control(v))
        .value();
    this.seedEmptyFormArray(allergies);

    this.form = this.fb.group({
      relation: [this.relation.relation, Validators.required],
      name: [this.relation.name, Validators.required],
      biologicalSex: [this.relation.biologicalSex, Validators.required],
      birthDate: [this.relation.birthDate, [momentValidator]],
      medicalConditions: this.fb.array(medicalConditions),
      narcanAllergy: [narcanAllergy, Validators.required],
      allergies: this.fb.array(allergies)
    });

    this.setName();
  }

  public personalInfoReady(): boolean {
    const result = this.editingExisting || (
        this.form.get('name').valid &&
        this.form.get('biologicalSex').valid &&
        this.form.get('birthDate').valid);
    return result;
  }

  public relationChanged(): void {
    const relation = this.form.get('relation').value;
    if (relation === RELATIONS.Myself && !_.isEmpty(this.user.name)) {
      this.form.get('name').setValue(this.user.name);
      this.name = this.user.name;
    }
  }

  public removeFormArrayElement(formControlName: string, index: number): void {
    const allergies: FormArray = this.form.get(formControlName) as FormArray;
    if (allergies.length === 1) {
      allergies.setControl(0, this.fb.control(''));
    } else {
      allergies.removeAt(index);
    }
  }

  public reset(): void {
    this.form.reset(this.relation, {emitEvent: false});
    this.relationChanged();
  }

  public sectionInvalid(section: string): boolean {
    return this.form.get(section).touched && this.form.get(section).invalid;
  }

  public setName(): void {
    this.name = this.form.get('name').value;
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.error = null;
    this.form.disable();

    const allergies = this.getSanitizedFormArrayValue('allergies');
    if (this.form.get('narcanAllergy').value === 'true') {
      allergies.unshift(RelationFormComponent.NARCAN_ALLERGY_INDICATOR);
    }

    const relation: IUserRelation = {
      relation: this.form.get('relation').value,
      name: this.form.get('name').value,
      biologicalSex: this.form.get('biologicalSex').value,
      birthDate: this.form.get('birthDate').value,
      medicalConditions: this.getSanitizedFormArrayValue('medicalConditions'),
      allergies: allergies,
      id: this.relation.id || uuid()
    };

    this.service.updateCreateRelation(new UserRelation(relation)).subscribe(
      this.successCallback,
      (error: ErrorMessage): void => {
        this.error = error;
        this.form.enable();
      }
    );
  }

  private getSanitizedFormArrayValue(formControlName: string): string[] {
    return _(this.form.get(formControlName).value)
        .map(_.trim)
        .reject(_.isEmpty)
        .value();
  }

  private seedEmptyFormArray(formControls: FormControl[]) {
    if (_.isEmpty(formControls)) {
      formControls.push(this.fb.control(''));
    }
  }

}
