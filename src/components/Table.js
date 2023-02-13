import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import Loading from "components/Loading";
import { Context } from "components/Context";
import { changeTeamColor } from "helpers/helpers";

export default function TableComponent() {
	const { data, loading, error } = useContext(Context);

	return (
		<>
			{loading && <Loading />}
			{error && <div data-testid="error">{error}</div>}

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
										className={changeTeamColor(
											team,
											match
										)}>
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
