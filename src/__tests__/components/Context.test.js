import React from "react";
import { render } from "@testing-library/react";
import { Context } from "../../components/Context";

describe("Context component", () => {
	it("should render without crashing", () => {
		render(
			<Context.Provider value={{}}>
				<div />
			</Context.Provider>
		);
	});
});
