import React from "react";
import { Table } from "react-bootstrap";
import { checkWinner } from "../helpers/helpers";

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
							<th scope="col">Home team</th>
							<th scope="col">Away team</th>
							<th scope="col">Match date</th>
							<th scope="col">Half-time score</th>
							<th scope="col">Score</th>
							<th scope="col">Stadium</th>
						</tr>
					</thead>
					<tbody>
						{data.schedules.map((match) => (
							<tr key={match.id}>
								{match.teams.map((team) => (
									<td
										key={team.id}
										// Nazwa checkWinner nijak ma sie do tego co robi, czyli zwracanie nazwy klasy dla zespolu zaleznie od wyniku
										className={checkWinner(team, match)}>
										{team.name}
									</td>
								))}
								<td>{match.date}</td>
								<td>{match.periodScore}</td>
								<td>{match.score}</td>
								<td>{match.stadium}</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}
