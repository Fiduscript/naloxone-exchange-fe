import * as _ from 'lodash';

export module FormUtils {
  export const trimInputs = (object: Object): any => {
    if (!object) {
      return;
    }

    if (typeof object === 'string') {
      return object.trim();
    }

    _.keys(object).forEach(key => {
      object[key] = trimInputs(object[key]);
    });

    return object;
  }
}
