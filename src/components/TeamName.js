import React from "react";
import { Col } from "react-bootstrap";
import { changeTeamColor } from "helpers/helpers";

export default function TeamName({ matchInfo, index }) {
	return (
		<Col
			className={`${changeTeamColor(
				matchInfo.teams[index],
				matchInfo
			)} animate__animated animate__fadeIn${
				index === 0 ? "Left" : "Right"
			} my-auto rounded py-4`}>
			{matchInfo.teams[index].name}
		</Col>
	);
}
