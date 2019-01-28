import * as moment from 'moment';

import { jsonConvert } from '../../../util/json-convert-provider';
import { UserRelation, UserRelations } from './user-relation';

const json = {relations: [
  {id: '1', name: 'B', birthDate: moment(), narcanAllergy: false,
      biologicalSex: 'yes please', medicalConditions: [], allergies: [], relation: 'Loved One'},
  {id: '2', name: 'A', birthDate: moment(), narcanAllergy: false,
      biologicalSex: 'yes please', medicalConditions: [], allergies: [], relation: 'Loved One'},
  {id: '3', name: 'D', birthDate: moment(), narcanAllergy: false,
      biologicalSex: 'yes please', medicalConditions: [], allergies: [], relation: 'Loved One'},
  {id: '4', name: 'C', birthDate: moment(), narcanAllergy: false,
      biologicalSex: 'yes please', medicalConditions: [], allergies: [], relation: 'Loved One'}
]};

describe('UserRelations', () => {
  it('should sort relations by name when constructed via constructor', () => {
    const vals = json.relations.map((v) => new UserRelation(v));
    const relations: UserRelations = new UserRelations(vals);
    expect(relations.relations[0].name).toBe('A');
    expect(relations.relations[1].name).toBe('B');
    expect(relations.relations[2].name).toBe('C');
    expect(relations.relations[3].name).toBe('D');
  });

  it('should sort relations by name when constructed jsonConvert', () => {
    const relations: UserRelations = jsonConvert.deserialize(json, UserRelations);
    expect(relations.relations[0].name).toBe('A');
    expect(relations.relations[1].name).toBe('B');
    expect(relations.relations[2].name).toBe('C');
    expect(relations.relations[3].name).toBe('D');
  });
});
