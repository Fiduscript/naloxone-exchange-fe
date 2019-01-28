import { Injectable, Provider } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Duration, Moment } from 'moment';

@JsonConverter
export class MomentConverter implements JsonCustomConvert<Moment> {

  public deserialize(value: string | number | Moment): Moment {
    if (moment.isMoment(value)) {
      return value;
    }
    return moment(value);
  }

  public serialize(value: Moment): string {
    return value.toISOString();
  }
}

@JsonConverter
export class DurationConverter implements JsonCustomConvert<Duration> {

  public deserialize(value: string | number): Duration {
    return moment.duration(value);
  }

  public serialize(value: Duration): string {
    return value.toISOString();
  }
}

@Injectable()
export class NgbDateMomentAdapter extends NgbDateAdapter<Moment> {

  public fromModel(date: Moment): NgbDateStruct {
    if (date == null) {
      return null;
    }
    return { year: date.year(), month: date.month() + 1, day: date.date() };
  }

  public toModel(date: NgbDateStruct): Moment {
    if (date == null) {
      return null;
    }
    return moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-MM-DD');
  }
}

export class MomentValidator implements Validator {
  public constructor(
      private format: string,
      private start?: Moment,
      private end?: Moment) {}

  public validate(c: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};

    const date: Moment = c.value;
    if (date == null) {
      errors.required = `A date is required.`;
      return errors;
    }

    if (this.start != null && date.isBefore(this.start)) {
      errors.start = `Must be after ${this.start.format(this.format)}.`;
    }
    if (this.end != null && this.end.isBefore(date)) {
      errors.end = `Must be before ${this.end.format(this.format)}.`;
    }

    return _.isEmpty(errors) ? null : errors;
  }
}

export const NgbMomentAdapterProvider: Provider = {provide: NgbDateAdapter, useClass: NgbDateMomentAdapter};
