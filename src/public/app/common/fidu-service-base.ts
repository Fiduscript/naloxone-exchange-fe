import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { Duration, Moment } from 'moment';
import * as moment from 'moment';
import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { jsonConvert } from '../util/json-convert-provider';
import { ErrorMessage } from './message-response';

/**
 * Base containing shared patterns and methods of our services.
 */
export class FiduServiceBase {

  private readonly memo: {[key: string]: any};
  private readonly memoExpires: {[key: string]: number};

  public constructor() {
    this.memo = {};
    this.memoExpires = {};

    this.memoize = this.memoize.bind(this);
    this.clearMemo = this.clearMemo.bind(this);
  }

  /**
   * Supplies a mapping function which deserializes raw json into a typescript class.
   * Should be called in a 'pipe' function.
   */
  protected deserialize<T, R>(clazz: { new (): R; }): OperatorFunction<T, R> {
    return map((input: T) => jsonConvert.deserialize(input, clazz));
  }

  /**
   * Returns an observable of a memoized object.
   * @param key
   */
  protected getMemoized<T>(key: string): Observable<T> {
    return of(this.memo[key]);
  }

  /**
   * Checks if there is a memoized result under the supplied key.
   * @param key
   */
  protected hasMemo(key: string): boolean {
    return this.memo[key] != null;
  }

  /**
   * Catches and logs any error messages encountered during the request.
   * Translates varieties of error messages into an ErrorMessage object.
   * Should be called at the end of every 'pipe' function.
   *
   * TODO: turn this on in development environemnts but turn it off for production
   */
  protected logErrors<T>(): MonoTypeOperatorFunction<T> {
    return catchError((error: any, caught: Observable<T>): never => {
      let e: ErrorMessage;
      if (error instanceof HttpErrorResponse) {
        console.error(`Service returned with ${error.status}, error enclosed:`, error.error);
        try {
          e = jsonConvert.deserialize(error.error, ErrorMessage);
        } catch (err) {
          // use defualt message
          e = new ErrorMessage(error.message);
        }
      } else {
        console.error('Unexpected Error', error);
        const message = error.message ? error.message : 'Unexpected error; please try again later.';
        e = new ErrorMessage(message);
      }
      throw e; // propegate translated error message
    });
  }

  /**
   * Memoizes raw object under the provided key.
   * @param key
   * @param expireTimeMapper? null or a mapping function that takes in the value and returns an expire time in millis
   * @param value
   */
  protected memoize<T>(key: string, expireTimeMapper: ExpireTimeMapper<T>|null , value: T): void {
    this.clearMemo(key);
    this.memo[key] = value;

    if (expireTimeMapper != null) {
      this.addMemoExpireTime(key, expireTimeMapper(value));
    }
  }

  /**
   * Supplies a tap function that memoizes the result of a query.
   * Should be called in a 'pipe' function, after any required deserialization.
   * @param key
   * @param expireTime a number used to expire the memoized result or a mapping
   *        function called on the memoized value to derive the expire time.
   */
  protected memoizeResult<T>(key: string, expireTime?: ExpireTimeMapper<T> | Moment | Duration): MonoTypeOperatorFunction<T> {
    let mapper: ExpireTimeMapper<T>;
    if (_.isFunction(expireTime)) {
      mapper = expireTime as ExpireTimeMapper<T>;
    } else  if (_.isNumber(expireTime)) {
      mapper = (value: T) => expireTime as Moment | Duration;
    } else {
      mapper = null;
    }
    return tap(_.partial(this.memoize, key, mapper));
  }

  private addMemoExpireTime(key: string, expireTime: Duration | Moment | null) {
    if (expireTime == null) { return; }

    let timeoutMillis: number;
    if (moment.isDuration(expireTime)) {
      timeoutMillis = (expireTime as Duration).asMilliseconds();
    } else if (moment.isMoment(expireTime)) {
      timeoutMillis = Math.max( (expireTime as Moment).valueOf() - moment().valueOf(), 0);
    } else {
      throw new Error('Invalid Expire time Provided.');
    }
    this.memoExpires[key] = window.setTimeout(this.clearMemo, timeoutMillis, key);
  }

  private clearMemo(key: string) {
    if (this.memoExpires[key] != null) {
      clearTimeout(this.memoExpires[key]);
      delete this.memoExpires[key];
    }
  }
}

export type ExpireTimeMapper<T> = (value: T) => Duration | Moment;
