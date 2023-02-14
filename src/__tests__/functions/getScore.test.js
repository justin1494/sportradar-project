import { getScore } from 'helpers/helpers';

describe('getScore', () => {
  it('returns the score for a valid match', () => {
    const event = {
      sport_event_status: {
        home_score: 2,
        away_score: 1
      }
    };

    expect(getScore(event)).toBe('2 : 1');
  });

  it('returns the status for an invalid match', () => {
    const event = {
      sport_event_status: {
        status: 'postponed'
      }
    };

    expect(getScore(event)).toBe('Postponed');
  });
});