import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FiduServiceBase } from '../../common/fidu-service-base';
import { UserAddress } from '../model/user-address';


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


  public getDependents() {
    // TODO: implement
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
}
