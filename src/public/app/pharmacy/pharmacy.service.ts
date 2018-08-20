import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { Pharmacies } from './model/pharmacies';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  private memo: {[s: string]: any} = {};

  constructor(private http: HttpClient) { }

  public listPharmacies(pageNumber: number = 1): Observable<Pharmacies> {
    const key: string = '/api/pharmacy/list';
    if (this.memo[key] != null) {
      return of(this.memo[key]);
    }

    return this.http.get<Pharmacies>(key).pipe(
      tap(_.bind((pharmacies: Pharmacies) => {
        this.memo[key] = pharmacies;
      }, this))
    );
  }
}
