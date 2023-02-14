import { changeTeamColor } from "helpers/helpers";

describe("changeTeamColor", () => {
	it("returns the class name for the match result", () => {
		const team = {
			id: 1,
		};

		const event = {
			winnerId: 1,
		};

		event.isValid = true;
		expect(changeTeamColor(team, event)).toBe("bg-success-subtle");

		event.winnerId = 2;
		expect(changeTeamColor(team, event)).toBe("bg-danger-subtle");

		event.isTie = true;
		expect(changeTeamColor(team, event)).toBe("bg-warning-subtle");

		event.isValid = false;
		expect(changeTeamColor(team, event)).toBe("bg-light-subtle");
	});
});
