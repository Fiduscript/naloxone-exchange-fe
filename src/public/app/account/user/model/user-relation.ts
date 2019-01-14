import { JsonObject, JsonProperty } from 'json2typescript';
import * as _ from 'lodash';
import { JsonInitialize } from 'src/public/app/util/json-convert-provider';

export const RELATIONS: string[] = [
  'Myself',
  'Family Memeber',
  'Friend',
  'Loved one'
];

export interface IUserRelation {
  alergies: string[];
  biologicalSex: string;
  id: string;
  insuranceId?: string; // TBD: separate insurance from dependent?
  medicalConditions: string[];
  name: string;
  relation: string;
}

@JsonObject('UserRelation')
export class UserRelation implements IUserRelation {

  @JsonProperty('alergies', [String])
  public readonly alergies: string[] = [];

  @JsonProperty('biologicalSex', String)
  public readonly biologicalSex: string = undefined;

  @JsonProperty('id', String)
  public readonly id: string = undefined;

  @JsonProperty('insuranceId', String, true)
  public readonly insuranceId?: string = undefined;

  @JsonProperty('medicalConditions', [String])
  public readonly medicalConditions: string[] = [];

  @JsonProperty('name', String)
  public readonly name: string = undefined;

  @JsonProperty('relation', String)
  public readonly relation: string = undefined;

  public constructor(userRelation: IUserRelation = {} as IUserRelation) {
    _.merge(this, userRelation);
  }

}

@JsonObject
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
