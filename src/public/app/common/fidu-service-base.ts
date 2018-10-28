import * as _ from 'lodash';
import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { jsonConvert } from '../../../common/json-convert-provider';

/**
 * Base containing shared patterns and methods of our services.
 */
export class FiduServiceBase {

  private readonly memo: {[key: string]: any};

  public constructor() {
    this.memo = {};

    this.memoize = this.memoize.bind(this);
  }

  /**
   * Supplies a mapping function which deserializes raw json into a typescript class.
   * Should be called in a 'pipe' function.
   */
  protected deserialize<T, R>(clazz: { new (): R; }): OperatorFunction<T, R> {
    return map((input: T) => jsonConvert.deserialize(input, clazz));
  }

  /**
   * Checks if there is a memoized result under the supplied key.
   * @param key
   */
  protected hasMemo(key: string): boolean {
    return this.memo[key] != null;
  }

  /**
   * Supplies a tap function that memoizes the result of a query.
   * Should be called in a 'pipe' function, after any required deserialization.
   * @param key
   */
  protected memoizeResult<T>(key: string): MonoTypeOperatorFunction<T> {
    return tap(_.partial(this.memoize, key));
  }

  /**
   * Returns an observable of a memoized object.
   * @param key
   */
  protected getMemoized<T>(key: string): Observable<T> {
    return of(this.memo[key]);
  }

  /**
   * Catches and logs any error messages encountered during the request.
   * Should be called at the end of every 'pipe' function.
   *
   * TODO: turn this on in development environemnts but turn it off for production
   */
  protected logErrors<T>(): MonoTypeOperatorFunction<T> {
    return catchError((error: any, caught: Observable<T>): never => {
      if (error instanceof HttpErrorResponse) {
        console.error(`Service returned with ${error.status}, error enclosed:`, error.status, error.error);
      } else {
        console.error('Unexpected Error: ', error);
      }
      throw error; // propegate
    });
  }

  private memoize<T>(key: string, value: T): void {
    this.memo[key] = value;
  }
}
