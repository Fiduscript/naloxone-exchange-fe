import { FormUtils } from './form-utils';
import { expect } from 'chai';

describe('FormUtils', () => {

  it('should trim string', () => {
    const input = '    test ';
    const expected = 'test';
    const output = FormUtils.trimInputs(input);
    expect(output).equals(expected);
  });

  it('should trim object', () => {
    const input = {
      key1: '   testvalue1',
      key2: ' test   value2   ',
    };
    const expected = {
      key1: 'testvalue1',
      key2: 'test   value2',
    };

    const output = FormUtils.trimInputs(input);
    expect(output).to.eql(expected);
  });

  it('should trim nested object', () => {
    const input = {
      key1: {
        key2: ' testvalue1 '
      }
    };
    const expected = {
      key1: {
        key2: 'testvalue1'
      }
    };

    const output = FormUtils.trimInputs(input);
    expect(output).to.eql(expected);
  });

  it('should trim array', () => {
    const input = ['  value1  ', ' value2 '];
    const expected = ['value1', 'value2'];

    const output = FormUtils.trimInputs(input);
    expect(output).to.eql(expected);
  });

  it('should trim nested array', () => {
    const input = {
      key1: {
        key2: ['  value1  ', ' value2 ']
      }
    };
    const expected = {
      key1: {
        key2: ['value1', 'value2']
      }
    };

    const output = FormUtils.trimInputs(input);
    expect(output).to.eql(expected);
  });
});
