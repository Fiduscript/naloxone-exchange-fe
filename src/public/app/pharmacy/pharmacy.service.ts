import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { jsonConvert } from '../util/json-convert-provider';
import { Pharmacies } from './model/pharmacies';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  private memo: {[s: string]: any} = {};

  constructor(private http: Http) { }

  public listPharmacies(pageNumber: number = 1): Observable<Pharmacies> {
    const key: string = '/api/pharmacy/list';
    if (this.memo[key] != null) {
      return of(this.memo[key]);
    }

    return this.http.get(key).pipe(
      map((response: Response): Pharmacies => {
        return jsonConvert.deserialize(response.json(), Pharmacies);
      }),
      tap(_.bind((pharmacies: Pharmacies) => {
        pharmacies.pharmacies.forEach((pharmacy) => {
          const k = `/api/pharmacy/list/${pharmacy.id}`;
          this.memo[k] = pharmacy;
        });
        this.memo[key] = pharmacies;
      }, this))
    );
  }
}
