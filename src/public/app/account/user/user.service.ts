import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FiduServiceBase} from '../../common/fidu-service-base';
import {IUserAddress, UserAddress} from '../model/user-address';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FiduServiceBase {

  constructor(private http: HttpClient) {
    super();
  }

  public getAddresses(userId: string): Observable<IUserAddress[]> {
    const path: string = '/api/users/getAddresses/' + userId;

    return this.http.get<UserAddress[]>(path).pipe(
      this.deserializeArray(UserAddress),
      this.logErrors()
    );
  }

  public saveAddress(address: IUserAddress): Observable<IUserAddress> {
    const path: string = '/api/users/saveAddress/';

    return this.http.put<UserAddress>(path, address).pipe(
      this.deserialize(UserAddress),
      this.logErrors()
    );
  }

  public deleteAddress(address: IUserAddress): Observable<IUserAddress> {
    const path: string = '/api/users/deleteAddress/';

    return this.http.put<UserAddress>(path, {userId: address.userId, addressId: address.addressId}).pipe(
      this.deserialize(UserAddress),
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
