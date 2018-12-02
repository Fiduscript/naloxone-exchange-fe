import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import * as moment from 'moment';
import { Duration, Moment } from 'moment';

@JsonConverter
export class MomentConverter implements JsonCustomConvert<Moment> {

  public deserialize(value: string | number): Moment {
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
