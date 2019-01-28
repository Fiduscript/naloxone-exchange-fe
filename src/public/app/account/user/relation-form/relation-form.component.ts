import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';

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

  public editingExisting: boolean = false;
  public form: FormGroup;
  public name: string = '';
  public readonly OTHER: string = 'Other';
  public otherSelected: boolean = false;
  @Input() public relation: IUserRelation = {} as IUserRelation;
  @Input() public sucessCallback: () => {};

  private user: UserInfo = new UserInfo();

  public constructor(
    private fb: FormBuilder,
    private service: UserService,
    private accountService: AccountService) { }

  public addFormArrayElement(formControlName: string): void {
    (this.form.get(formControlName) as FormArray).push(this.fb.control(''));
  }

  public getRelations(): string[] {
    return RELATIONS;
  }

  public ngOnInit(): void {
    this.editingExisting = !_.isEmpty(this.relation.relation);
    this.accountService.whoami().subscribe((user: UserInfo) => {
      this.user = user;
    });

    this.otherSelected = !_.isEmpty(this.relation.relation) &&
       !RELATIONS.includes(this.relation.relation);

    const momentValidator = new MomentRangeValidator('MMM YYYY',
        moment().subtract(100, 'years').startOf('month'),
        moment().startOf('month'));

    const medicalConditions = (this.relation.medicalConditions || []).map((v) => this.fb.control(v));
    this.seedEmptyFormArray(medicalConditions);

    const allergies = (this.relation.allergies || []).map((v) => this.fb.control(v));
    this.seedEmptyFormArray(allergies);

    this.form = this.fb.group({
      relation: [this.otherSelected ? this.OTHER : this.relation.relation, Validators.required],
      otherRelation: [this.relation.relation, Validators.required],
      name: [this.relation.name, Validators.required],
      biologicalSex: [this.relation.biologicalSex, Validators.required],
      birthDate: [this.relation.birthDate, [momentValidator]],
      medicalConditions: this.fb.array(medicalConditions),
      narcanAllergy: [this.relation.narcanAllergy, Validators.required],
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
    this.otherSelected = relation === this.OTHER;
    this.form.get('otherRelation').setValue(this.otherSelected ? '' : relation);

    if (relation === 'Myself' && !_.isEmpty(this.user.name)) {
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

  private seedEmptyFormArray(formControls: FormControl[]) {
    if (_.isEmpty(formControls)) {
      formControls.push(this.fb.control(''));
    }
  }

}
