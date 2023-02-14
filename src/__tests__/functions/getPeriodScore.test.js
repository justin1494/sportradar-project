import { getPeriodScore } from "helpers/helpers";

describe("getPeriodScore", () => {
	it("returns the period score as a string if it is valid", () => {
		const event = {
			sport_event_status: {
				home_score: 10,
				period_scores: [
					{
						home_score: 10,
						away_score: 5,
					},
				],
			},
		};
		expect(getPeriodScore(event)).toBe("10 : 5");
	});

	it("returns the status as a string if the score is not valid", () => {
		const event = {
			home_score: false,
			sport_event_status: {
				status: "postponed",
			},
		};
		expect(getPeriodScore(event)).toBe("Postponed");
	});
});
