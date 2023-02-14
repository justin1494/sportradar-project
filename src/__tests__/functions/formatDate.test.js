import { formatDate } from 'helpers/helpers';

describe('formatDate', () => {
  it('returns the formatted date string', () => {
    const date = new Date('2023-01-02T00:00:00');

    expect(formatDate(date)).toBe('02.01.2023');
  });
});