import React from "react";
import { Table } from "react-bootstrap";

export const getCompetitorsNames = (sportEvent) => {
	const competitors = sportEvent.competitors.map(
		(competitor) => competitor.name
	);
	return competitors.join(" - ");
};

export const getScore = (sportEventStatus) => {
	// checks if the score is valind number, otherwise it may be posponed or delayed or other.
	if (typeof sportEventStatus.home_score === "number") {
		return `${sportEventStatus.home_score} : ${sportEventStatus.away_score}`;
	}
	return sportEventStatus.status;
};

export default function TableComponent({ data, loading, error }) {
	return (
		<>
			{loading && <div>A moment please...</div>}
			{error && (
				<div>{`There is a problem fetching the post data - ${error}`}</div>
			)}
			{data && (
				<Table bordered hover>
					<thead>
						<tr>
							<th scope="col">TEAMS (HOME - AWAY)</th>
							<th scope="col">SCORE (HOME - AWAY)</th>
						</tr>
					</thead>
					<tbody>
						{data.schedules.map((match) => (
							<tr key={match.sport_event.id}>
								<td>
									{getCompetitorsNames(match.sport_event)}
								</td>
								<td>{getScore(match.sport_event_status)}</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}
