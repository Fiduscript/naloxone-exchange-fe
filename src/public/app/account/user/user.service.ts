import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable, of, throwError } from 'rxjs';

import { FiduServiceBase } from '../../common/fidu-service-base';
import { ErrorMessage, SuccessMessage } from '../../common/message-response';
import { jsonConvert } from '../../util/json-convert-provider';
import { IAddress } from '../model/address';
import { RELATIONS, UserRelation, UserRelations } from './model/user-relation';

const ADDRESSSES: {[key: string]: IAddress} = _.keyBy([
  {
    addressId: 'ADDY-123',
    userId: 'USER-123',
    name: 'Lewis Black',
    state: 'Washington',
    street1: '123 abc st',
    street2: '',
    city: 'Seattle',
    zip: '98121',
    phoneNumber: '555-444-3333',
    weekendOkay: true
  },
  {
    addressId: 'ADDY-456',
    userId: 'USER-123',
    name: 'Lewis Black c/o Amazon.com',
    state: 'Colorado',
    street1: '551 boren ave N',
    street2: '',
    city: 'Seattle',
    zip: '98109',
    phoneNumber: '555-444-3333',
    weekendOkay: false,
    specialInstructions: 'Leave with amazon front desk.'
  }
], 'addressId');

const relations = _.keyBy([
  {id: '1', birthDate: moment(), narcanAllergy: false,
      name: 'Jake', biologicalSex: 'male', medicalConditions: [], allergies: [], relation: RELATIONS[0] },
  {id: '2', birthDate: moment(), narcanAllergy: false,
      name: 'Andrea', biologicalSex: 'female', medicalConditions: [], allergies: [], relation: RELATIONS[1]},
  {id: '4', birthDate: moment(), narcanAllergy: false,
      name: 'Cassy', biologicalSex: 'female', medicalConditions: [], allergies: [], relation: RELATIONS[3]},
  {id: '3', birthDate: moment(), narcanAllergy: true,
      name: 'Dave', biologicalSex: 'male', medicalConditions: [], allergies: [], relation: 'RELATIONS[2]'},
], 'id');

@Injectable({
  providedIn: 'root'
})
export class UserService extends FiduServiceBase {

  public constructor(private http: HttpClient) {
    super();
  }

  public deleteAddress(addressId: string): Observable<SuccessMessage> {
    const success: boolean = delete ADDRESSSES[addressId];
    if (success) {
      return of(new SuccessMessage(`Successfully deleted address ${addressId}.`));
    }
    return throwError(new ErrorMessage(`Failed to deleted address ${addressId}.`));
  }

  public deleteRelation(relationId: string): Observable<SuccessMessage> {
    const success: boolean = delete relations[relationId];
    if (success) {
      return of(new SuccessMessage(`Successfully deleted relation ${relationId}.`));
    }
    return throwError(new ErrorMessage(`Failed to deleted relation ${relationId}.`));
  }

  public getAddressses(): Observable<IAddress[]> {
    return of(_.values(ADDRESSSES));
  }

  public getRelations(): Observable<UserRelations> {
    return of(jsonConvert.deserialize({relations: _.values(relations)}, UserRelations));
  }

  public setAddress(address: IAddress): Observable<SuccessMessage> {
    ADDRESSSES[address.addressId] = address;
    return of(new SuccessMessage('Success was had here'));
  }

  public updateCreateRelation(relation: UserRelation): Observable<SuccessMessage> {
    relations[relation.id] = jsonConvert.serialize(relation);
    return of(new SuccessMessage('Success'));
  }

}
