import * as _ from 'lodash';

/**
 * A function that only merges known properties in the
 *  target with those found in the source object.
 */
export const safeMerge = <T>(target: T, source: T): void => {
  const pairs = _.toPairs(target);
  for (const pair of pairs) {
    const k = pair[0];
    target[k] = source[k] || pair[1];
  }
};
