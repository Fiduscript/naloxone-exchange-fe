import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { FiduServiceBase } from '../common/fidu-service-base';
import { Pharmacies } from './model/pharmacies';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService extends FiduServiceBase {

  constructor(private http: HttpClient) {
    super();
  }

  public listPharmacies(pageNumber: number = 1): Observable<Pharmacies> {
    const key: string = '/api/pharmacy/list';
    if (this.hasMemo(key)) {
      return this.getMemoized(key);
    }

    return this.http.get<Pharmacies>(key).pipe(
      this.deserialize(Pharmacies),
      this.memoizeResult(key)
    );
  }
}
