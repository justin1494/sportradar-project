import { changeEventTime } from 'helpers/helpers';

describe('changeEventTime', () => {
  it('formats the event time with hours, minutes, and seconds', () => {
    expect(changeEventTime('2022-02-10T00:00:00')).toBe('00:00:00');
    expect(changeEventTime('2022-02-10T12:34:56')).toBe('12:34:56');
    expect(changeEventTime('2022-02-10T09:05:23')).toBe('09:05:23');
  });
});