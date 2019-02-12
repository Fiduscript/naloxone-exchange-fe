import * as _ from 'lodash';

export module FormUtils {
  export const trimInputs = (object: Object): void => {
    if (!object) {
      return;
    }

    if (typeof object === 'string') {
      object = object.trim();
      return;
    }

    _.keys(object).forEach(key => {
      if (typeof object[key] === 'string') {
        object[key] = object[key].trim();
      } else if (typeof object[key] === 'object') {
        trimInputs(object[key]);
      }
    });
  }
}
