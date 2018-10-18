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
    const path: string = '/api/pharmacy/list';
    if (this.hasMemo(path)) {
      return this.getMemoized(path);
    }

    return this.http.get<Pharmacies>(path).pipe(
        this.deserialize(Pharmacies),
        this.memoizeResult(path),
        this.logErrors()
      );
  }

  private mapPharmacies(pharmacies: Pharmacies): Pharmacies {
    return jsonConvert.deserialize(pharmacies, Pharmacies);
  }
}
