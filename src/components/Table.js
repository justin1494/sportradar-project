import React, { useContext } from "react";
import { Table, InputGroup, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import { Context } from "components/Context";
import { changeTeamColor } from "helpers/helpers";

export default function TableComponent() {
	const { data, loading, error, setSearchableData, searchableData } =
		useContext(Context);

	const searchForTeam = (e) => {
		setSearchableData({
			...data,
			schedules: data.schedules.filter((item) =>
				item.teams.some((team) =>
					team.name
						.toLowerCase()
						.includes(e.target.value.toLowerCase())
				)
			),
		});
	};

	const navigate = useNavigate();
	const navigateToSubpage = (route) => {
		navigate(`/${route}`);
	};

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return (
			<>
				<div data-testid="error">{error}</div>
			</>
		);
	}

	if (searchableData) {
		return (
			<>
				<InputGroup className="mb-3">
					<Form.Control
						placeholder="Seach for a team"
						aria-label="Seach for a team"
						aria-describedby="basic-addon1"
						onChange={(e) => {
							searchForTeam(e);
						}}
					/>
				</InputGroup>
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
						{searchableData.schedules.map((match) => (
							<tr
								key={match.id}
								onClick={() => navigateToSubpage(match.id)}
								role="button">
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
			</>
		);
	}
}
