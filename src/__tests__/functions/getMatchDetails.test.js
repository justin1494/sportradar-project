import { getMatchDetails } from "helpers/helpers";

describe("getMatchDetails", () => {
	it("returns the match details", () => {
		const event = {
			sport_event: {
				id: 1,
				start_time: "2023-01-02T00:00:00",
				competitors: [
					{
						name: "Team 1",
					},
					{
						name: "Team 2",
					},
				],
				venue: {
					name: "Stadium",
				},
			},
			sport_event_status: {
				period_scores: [
					{
						home_score: 2,
						away_score: 1,
					},
				],
				home_score: 2,
				away_score: 1,
				winner_id: 2,
			},
		};

		const matchDetails = getMatchDetails(event);

		expect(matchDetails).toEqual({
			id: 1,
			date: "02.01.2023",
			periodScore: "2 : 1",
			score: "2 : 1",
			stadium: "Stadium",
			teams: [
				{
					name: "Team 1",
				},
				{
					name: "Team 2",
				},
			],
			isTie: undefined,
      isValid: true,
			timeline: undefined,
			winnerId: 2,
		});
	});
});
