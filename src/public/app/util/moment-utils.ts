import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import * as moment from 'moment';
import { Duration, Moment } from 'moment';

@JsonConverter
class MomentConverter implements JsonCustomConvert<Moment> {
  public serialize(value: Moment): string {
    return value.toISOString();
  }

  public deserialize(value: string | number): Moment {
    return moment(value);
  }
}

@JsonConverter
class DurationConverter implements JsonCustomConvert<Duration> {

  public serialize(value: Duration): string {
    return value.toISOString();
  }

  public deserialize(value: string | number): Duration {
    return moment.duration(value);
  }
}

export {
  MomentConverter,
  DurationConverter
};
