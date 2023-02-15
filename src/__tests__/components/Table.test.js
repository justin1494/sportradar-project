import React from "react";
import { render, screen } from "@testing-library/react";
import TableComponent from "components/Table";
import { Context } from "components/Context";


const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedNavigate,
}));


describe("TableComponent", () => {
	it("renders loading component when loading is true", () => {
		const contextValue = {
			searchableData: null,
			loading: true,
			error: null,
		};
		render(
			<Context.Provider value={contextValue}>
				<TableComponent />
			</Context.Provider>
		);

		expect(screen.getByTestId("loading")).toBeInTheDocument();
	});

	it("renders error message when error is present", () => {
		const contextValue = {
			searchableData: null,
			loading: false,
			error: "There was a problem fetching the data",
		};
		render(
			<Context.Provider value={contextValue}>
				<TableComponent />
			</Context.Provider>
		);

		expect(screen.getByTestId("error")).toBeInTheDocument();
	});

	it("renders table with match details when data is present", () => {
		const contextValue = {
			searchableData: {
				schedules: [
					{
						date: "02.01.2023",
						score: "1 : 0",
						periodScore: "0 : 0",
						teams: [{ name: "Home" }, { name: "Away" }],
						stadium: "Stadium_name",
					},
				],
			},
			loading: false,
			error: null,
		};
		render(
			<Context.Provider value={contextValue}>
				<TableComponent />
			</Context.Provider>
		);
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Away")).toBeInTheDocument();
		expect(screen.getByText("02.01.2023")).toBeInTheDocument();
		expect(screen.getByText("0 : 0")).toBeInTheDocument();
		expect(screen.getByText("1 : 0")).toBeInTheDocument();
		expect(screen.getByText("Stadium_name")).toBeInTheDocument();
	});
});
