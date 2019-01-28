import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';
import { Moment } from 'moment';

import { MomentConverter } from 'src/public/app/util/moment-utils';
import { safeMerge } from '../../../../../common/safe-merge';
import { JsonInitialize } from '../../../util/json-convert-provider';

export const RELATIONS: string[] = [
  'Myself',
  'Family Member',
  'Friend',
  'Loved one'
];

export interface IUserRelation {
  allergies: string[];
  biologicalSex: string;
  birthDate: Moment;
  id: string;
  insuranceId?: string; // TBD: separate insurance from dependent?
  medicalConditions: string[];
  name: string;
  narcanAllergy: boolean;
  relation: string;
  userId?: string;
}

@JsonObject('UserRelation')
export class UserRelation implements IUserRelation {

  @JsonProperty('allergies', [String])
  public readonly allergies: string[] = [];

  @JsonProperty('biologicalSex', String)
  public readonly biologicalSex: string = undefined;

  @JsonProperty('birthDate', MomentConverter)
  public readonly birthDate: Moment = undefined;

  @JsonProperty('id', String)
  public readonly id: string = undefined;

  @JsonProperty('insuranceId', String, true)
  public readonly insuranceId?: string = undefined;

  @JsonProperty('medicalConditions', [String])
  public readonly medicalConditions: string[] = [];

  @JsonProperty('name', String)
  public readonly name: string = undefined;

  @JsonProperty('narcanAllergy', Boolean)
  public readonly narcanAllergy: boolean = undefined;

  @JsonProperty('relation', String)
  public readonly relation: string = undefined;

  // no @JsonProperty, don't pass this around.
  public readonly userId?: string;

  public constructor(userRelation: IUserRelation = {} as IUserRelation) {
    safeMerge(this, userRelation);
  }

}

@JsonObject('UserRelations')
export class UserRelations implements JsonInitialize {

  @JsonProperty('relations', [UserRelation])
  public readonly relations: UserRelation[] = [];

  public constructor(relations: UserRelation[] = []) {
    this.relations = _.sortBy(relations, 'name');
    this.jsonInitialize = _.once(this.jsonInitialize);
  }

  public jsonInitialize(): void {
    // `(this as any)` is a hack to keep readonly properties but allow
    // them to be modified without the Typescript compiler complaining.
    (this as any).relations = _.sortBy(this.relations, 'name');
  }

}
