import React from "react";
import { render, screen } from "@testing-library/react";
import Players from "components/Players";

const matchInfo = {
	statistics: [
		{
			id: 1,
			players: [
				{ id: 1, name: "Doe, John", starter: true },
				{ id: 2, name: "Smith, Jane", starter: false },
			],
		},
		{
			id: 2,
			players: [
				{ id: 3, name: "Johnson, Bob", starter: true },
				{ id: 4, name: "Lee, David", starter: false },
			],
		},
	],
};

describe("Players component", () => {
	it("should render the players with the correct format and order", () => {
		render(<Players matchInfo={matchInfo} />);
		expect(screen.getByText("Doe")).toHaveStyle("font-weight: bold");
		expect(screen.getByText("Smith")).toHaveStyle("font-weight: bold");
		expect(screen.getByText("Johnson")).toHaveStyle("font-weight: bold");
		expect(screen.getByText("Lee")).toHaveStyle("font-weight: bold");
	});
});
