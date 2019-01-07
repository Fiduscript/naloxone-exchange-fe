import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of, throwError } from 'rxjs';

import { ErrorMessage, SuccessMessage } from '../../common/message-response';
import { IAddress } from '../model/address';

const ADDRESSSES: {[key: string]: IAddress} = _.keyBy([
  {
    addressId: 'ADDY-123',
    userId: 'USER-123',
    name: 'Lewis Black',
    state: 'WA',
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
    state: 'WA',
    street1: '551 boren ave N',
    street2: '',
    city: 'Seattle',
    zip: '98109',
    phoneNumber: '555-444-3333',
    weekendOkay: false,
    specialInstructions: 'Leave with amazon front desk.'
  }
], 'addressId');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor() { }

  public deleteAddress(addressId: string): Observable<SuccessMessage> {
    const success: boolean = ADDRESSSES[addressId] != null;
    delete ADDRESSSES[addressId];
    if (success) {
      return of(new SuccessMessage(`Successfully deleted address ${addressId}`));
    }
    return throwError(new ErrorMessage(`Failed to deleted address ${addressId}`));
  }

  public getAddressses(): Observable<IAddress[]> {
    return of(_.values(ADDRESSSES));
  }

  public getOrders() {
    // TODO: implement
  }

  public getRelations() {
    // TODO: implement
  }

  public setAddress(address: IAddress): Observable<SuccessMessage> {
    ADDRESSSES[address.addressId] = address;
    return of(new SuccessMessage('Success was had here'));
  }



}
