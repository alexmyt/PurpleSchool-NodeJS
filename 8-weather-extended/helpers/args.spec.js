import { getArgs } from './args.js';

describe('args helper', () => {
  test('One arg', () => {
    const args = ['one', 'two', '-h'];
    expect(getArgs(args)).toEqual({h: true});
  });

  test('Two args', () => {
    const args = ['one', 'two', '-h', '-s'];
    expect(getArgs(args)).toEqual({h: true, s: true});
  });

  test('Two args with value', () => {
    const args = ['one', 'two', '-h', '-s', 'value'];
    expect(getArgs(args)).toEqual({h: true, s: 'value'});
  });

  test('Three args with value', () => {
    const args = ['one', 'two', '-h', '-s', 'value', '-d'];
    expect(getArgs(args)).toEqual({h: true, s: 'value', d: true});
  });

  test('Two some args with value', () => {
    const args = ['one', 'two', '-h', '-s', 'value', '-s', 'other'];
    expect(getArgs(args)).toEqual({h: true, s: ['value', 'other']});
  });
});
