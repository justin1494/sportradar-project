import React from "react";
import { render, screen } from "@testing-library/react";
import TeamName from "components/TeamName";

const matchInfo = {
	teams: [{ name: "Team A" }, { name: "Team B" }],
};

describe("TeamName component", () => {
	it("renders the first team name correctly", () => {
		render(<TeamName matchInfo={matchInfo} index={0} />);
		expect(screen.getByText("Team A")).toBeInTheDocument();
	});

	it("renders the second team name correctly", () => {
		render(<TeamName matchInfo={matchInfo} index={1} />);
		expect(screen.getByText("Team B")).toBeInTheDocument();
	});
});
