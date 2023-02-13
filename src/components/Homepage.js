import React, { useContext } from "react";
import DropdownComponent from "components/Dropdown";
import TableComponent from "components/Table";
import { Context } from "components/Context";
import { Container } from "react-bootstrap";

export default function HomepageComponent() {
	const { displayedSeason } = useContext(Context);
	return (
		<Container data-testid="homepage-component">
			<DropdownComponent />
			{displayedSeason && (
				<h1 className="mb-4 text-center" data-testid="header">
					{displayedSeason.name}
				</h1>
			)}
			<TableComponent />
		</Container>
	);
}
