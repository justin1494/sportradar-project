import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Context } from "./Context";

export default function DropdownComponent() {
	const { seasonsData, setDisplayedSeason } = useContext(Context);

	const handleSeasonPick = (season) => {
		setDisplayedSeason(season);
	};

	return (
		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				SEASONS
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{seasonsData &&
					seasonsData.seasons.map((season) => (
						<Dropdown.Item
							key={season.id}
							onClick={() => handleSeasonPick(season)}>
							{season.name}
						</Dropdown.Item>
					))}
			</Dropdown.Menu>
		</Dropdown>
	);
}
