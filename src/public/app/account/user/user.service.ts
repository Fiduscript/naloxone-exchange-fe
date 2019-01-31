import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {FiduServiceBase} from '../../common/fidu-service-base';
import {IUserAddress, UserAddress} from '../model/user-address';

import {SuccessMessage} from '../../common/message-response';
import {IAddress} from '../model/address';


@Injectable({
  providedIn: 'root'
})
export class UserService extends FiduServiceBase {

  constructor(private http: HttpClient) {
    super();
  }

  public deleteAddress(address: IUserAddress): Observable<IUserAddress> {
    const path: string = '/api/users/deleteAddress/';

    return this.http.put<UserAddress>(path, {userId: address.userId, addressId: address.addressId}).pipe(
      this.deserialize(UserAddress),
      this.logErrors()
    );
  }

  public getAddresses(userId: string): Observable<IUserAddress[]> {
    const path: string = '/api/users/getAddresses/' + userId;

    return this.http.get<UserAddress[]>(path).pipe(
      this.deserializeArray(UserAddress),
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

  // TODO return success msg?
  public saveAddress(address: IUserAddress): Observable<IUserAddress> {
    const path: string = '/api/users/saveAddress/';

    return this.http.put<UserAddress>(path, address).pipe(
      this.deserialize(UserAddress),
      this.logErrors()
    );
  }

  // TODO remove
  public setAddress(address: IAddress): Observable<SuccessMessage> {
    ADDRESSSES[address.addressId] = address;
    return of(new SuccessMessage('Success was had here'));
  }


}
