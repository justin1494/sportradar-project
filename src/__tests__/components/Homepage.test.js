import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import HomepageComponent from "components/Homepage";
import { Context } from "components/Context";

jest.mock("components/Dropdown", () => () => (
	<div data-testid="dropdown-mock" />
));
jest.mock("components/Table", () => () => (
	<div data-testid="table-mock" />
));

const mockSeason = { name: "Summer" };

afterEach(cleanup);

describe("HomepageComponent", () => {
	it("should render the dropdown component and table component", async () => {
		render(
			<Context.Provider value={{ displayedSeason: mockSeason }}>
				<HomepageComponent />
			</Context.Provider>
		);

		const dropdown = await screen.findByTestId("dropdown-mock");
		const table = await screen.findByTestId("table-mock");
		const header = await screen.findByTestId("header");

		expect(dropdown).toBeInTheDocument();
		expect(table).toBeInTheDocument();
		expect(header).toHaveTextContent(mockSeason.name);
	});
});

// I am mocking the DropdownComponent and TableComponent to avoid testing them in this test, and focusing on testing the HomepageComponent itself. I am also using a mock context value for the displayedSeason to simplify the test setup.
