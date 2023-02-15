import React from "react";
import { Row, Col } from "react-bootstrap";

const makeSurnameBold = (name) => {
	const nameArr = name.split(", ");
	return (
		<>
			<b>{nameArr[0]}</b>, {nameArr[1]}
		</>
	);
};

const sortFn = (a, b) => Number(b.starter) - Number(a.starter);

const sortedPlayers = (players) => {
	return players.sort(sortFn);
};

export default function Players({ matchInfo }) {
	return (
		<Row className="justify-content-center">
			{matchInfo?.statistics.map((team) => (
				<Col key={team.id} lg={4} xs={6} className="text-center ">
					<h2 className="mb-5">PLAYERS</h2>
					{sortedPlayers(team.players).map((player) => (
						<p
							key={player.id}
							className={`${
								player.starter
									? `bg-primary-subtle`
									: `bg-dark-subtle`
							}  rounded-1 py-1`}>
							{makeSurnameBold(player.name)}
						</p>
					))}
				</Col>
			))}
		</Row>
	);
}
