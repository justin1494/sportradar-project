import { getCompetitorsNames, getScore } from "./Table.js";
import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("getCompetitorsNames", () => {
	it('returns a string with the names of the competitors joined by " - "', () => {
		const sportEvent = {
			competitors: [{ name: "Team 1" }, { name: "Team 2" }],
		};
		const expectedResult = "Team 1 - Team 2";
		const result = getCompetitorsNames(sportEvent);
		expect(result).toBe(expectedResult);
	});
});

describe("getScore", () => {
	it("returns a string with the score if home_score and away_score are numbers", () => {
		const sportEventStatus = {
			home_score: 2,
			away_score: 1,
		};
		const expectedResult = "2 : 1";
		const result = getScore(sportEventStatus);
		expect(result).toBe(expectedResult);
	});

	it("returns the status if home_score or away_score is not a number", () => {
		const sportEventStatus = {
			status: "string",
		};
		const expectedResult = "string";
		const result = getScore(sportEventStatus);
		expect(result).toBe(expectedResult);
	});
});

describe("Table", () => {
	it("renders a loading message when loading is true", () => {
		const data = null;
		const loading = true;
		const error = null;
		render(<Table data={data} loading={loading} error={error} />);
		const loadingMessage = screen.getByText("A moment please...");
		expect(loadingMessage).toBeInTheDocument();
	});

	it("renders an error message when error is not null", () => {
		const data = null;
		const loading = false;
		const error = "Test error";
		render(<Table data={data} loading={loading} error={error} />);
		const errorMessage = screen.getByText(
			`There is a problem fetching the post data - ${error}`
		);
		expect(errorMessage).toBeInTheDocument();
	});

	it("renders a table when data is not null", () => {
		const data = {
			schedules: [
				{
					sport_event: {
						competitors: [{ name: "Team 1" }, { name: "Team 2" }],
					},
					sport_event_status: {
						home_score: 1,
						away_score: 0,
					},
				},
			],
		};
		const loading = false;
		const error = null;
		render(<Table data={data} loading={loading} error={error} />);
		const table = screen.getByRole("table");
		expect(table).toBeInTheDocument();
	});
});
