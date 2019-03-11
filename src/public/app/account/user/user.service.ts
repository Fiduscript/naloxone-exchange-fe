import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { FiduServiceBase } from '../../common/fidu-service-base';
import { UserAddress } from '../model/user-address';

import { SuccessMessage } from '../../common/message-response';
import { jsonConvert } from '../../util/json-convert-provider';
import { RELATIONS, UserRelation } from './model/user-relation';

const relations = _.keyBy([
  {id: '1', birthDate: moment(), name: 'Jake', biologicalSex: 'male',
      medicalConditions: [], allergies: [], relation: RELATIONS['Myself'] },
  {id: '2', birthDate: moment(), name: 'Andrea', biologicalSex: 'female',
      medicalConditions: [], allergies: [], relation: RELATIONS['Family Member']},
  {id: '4', birthDate: moment(), name: 'Cassy', biologicalSex: 'female',
      medicalConditions: [], allergies: [], relation: RELATIONS['Friend']},
  {id: '3', birthDate: moment(), name: 'Dave', biologicalSex: 'male',
      medicalConditions: [], allergies: [], relation: 'RELATIONS[2]'},
], 'id');

@Injectable({
  providedIn: 'root'
})
export class UserService extends FiduServiceBase {

  constructor(private http: HttpClient) {
    super();
  }

  public deleteAddress(address: UserAddress): Observable<UserAddress> {
    const path: string = '/api/users/deleteAddress/';

    return this.http.put<UserAddress>(path, {userId: address.userId, addressId: address.addressId});
  }

  public getAddresses(): Observable<UserAddress[]> {
    const path: string = '/api/users/getAddresses/';

    return this.http.get<UserAddress[]>(path);
  }

  public getAddresses(): Observable<UserAddress[]> {
    const path: string = '/api/users/getAddresses/';

    return this.http.get<UserAddress[]>(path);
  }


  public getDependents() {
    // TODO: implement
  }

  public getOrders() {
    // TODO: implement
    // should this be here? might make more sense to have an OrdersService
  }

  public getOrders() {
    // TODO: implement
    // should this be here? might make more sense to have an OrdersService
  }

  // TODO return success msg?
  public saveAddress(address: UserAddress): Observable<UserAddress> {
    const path: string = '/api/users/saveAddress/';

    return this.http.put<UserAddress>(path, address);
  }

  public updateCreateRelation(relation: UserRelation): Observable<SuccessMessage> {
    relations[relation.id] = jsonConvert.serialize(relation);
    return of(new SuccessMessage('Success'));
  }
}
