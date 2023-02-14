import { render, screen } from "@testing-library/react";
import Loading from "components/Loading";

describe("Loading component", () => {
	it("renders the spinner and the loading message", () => {
		render(<Loading />);

		expect(screen.getByTestId("spinner")).toBeInTheDocument();
		expect(screen.getByText("Data is loading...")).toBeInTheDocument();
	});
});
