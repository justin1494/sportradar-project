import { convertType } from 'helpers/helpers';

describe('convertType', () => {
  it('converts an underscore separated string to a spaced string with the first letter capitalized', () => {
    expect(convertType('some_type')).toBe('Some type');
    expect(convertType('another_type')).toBe('Another type');
  });
});