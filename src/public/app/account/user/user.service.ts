import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FiduServiceBase} from '../../common/fidu-service-base';
import {Pharmacies} from '../../pharmacy/model/pharmacies';
import {UserPoolAddOnsType} from 'aws-sdk/clients/cognitoidentityserviceprovider';
import {UserAddress} from '../model/user-address';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FiduServiceBase {

  constructor(private http: HttpClient) {
    super();
  }

  public getAddressses() {
    const path: string = '/api/users/getAddresses/';
    // if (this.hasMemo(path)) {
    //   return this.getMemoized(path);
    // }

    return this.http.get<UserAddress>(path).pipe(
      this.deserialize(UserAddress),
      // this.memoizeResult(path),
      this.logErrors()
    );
  }

  public getDependents() {
    // TODO: implement
  }

  public getOrders() {
    // TODO: implement
    // should this be here? might make more sense to have an OrdersService
  }

}
