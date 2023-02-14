import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropdownComponent from "components/Dropdown";
import { Context } from "components/Context";

describe("DropdownComponent", () => {
	it("renders dropdown with seasons", () => {
		const seasonsData = {
			seasons: [
				{ id: 1, name: "Season 1" },
				{ id: 2, name: "Season 2" },
				{ id: 3, name: "Season 3" },
			],
		};
		const setDisplayedSeason = jest.fn();

		render(
			<Context.Provider value={{ seasonsData, setDisplayedSeason }}>
				<DropdownComponent />
			</Context.Provider>
		);

		const dropdownButton = screen.getByText("SEASONS");
		fireEvent.click(dropdownButton);

		const season1 = screen.getByText("Season 1");
		fireEvent.click(season1);

		expect(setDisplayedSeason).toHaveBeenCalledWith({
			id: 1,
			name: "Season 1",
		});

		const season2 = screen.getByText("Season 2");
		fireEvent.click(season2);

		expect(setDisplayedSeason).toHaveBeenCalledWith({
			id: 2,
			name: "Season 2",
		});
	});
});
