import { matchValid } from 'helpers/helpers';

describe('matchValid', () => {
  it('returns true for a valid match', () => {
    const event = {
      sport_event_status: {
        home_score: 2
      }
    };

    expect(matchValid(event)).toBe(true);
  });

  it('returns false for an invalid match', () => {
    const event = {
      sport_event_status: {
        home_score: 'postponed'
      }
    };

    expect(matchValid(event)).toBe(false);
  });
});