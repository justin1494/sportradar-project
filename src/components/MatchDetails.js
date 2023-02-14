import "animate.css";
import Loading from "components/Loading";
import TeamName from "components/TeamName";
import { changeEventTime, convertType, getMatchDetails } from "helpers/helpers";
import { useEffect, useState } from "react";
import { Button, Col, Collapse, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MatchDetails() {
	const { matchId } = useParams(null);
	const [matchInfo, setMatchInfo] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(true);

	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		fetch(
			`http://localhost:3001/pipe/https://api.sportradar.us/soccer/trial/v4/en/sport_events/${matchId}/timeline.json?api_key=${process.env.REACT_APP_API_URL}`
		)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}
				const data = await response.json();
				setMatchInfo(getMatchDetails(data));
			})
			.catch((err) => {
				console.error("Error", err);
			});
	}, [matchId]);

	if (!matchInfo) {
		return <Loading />;
	}

	return (
		<div data-testid="match-details-component">
			<Container>
				<Button onClick={goBack} variant="success">
					Go back
				</Button>
				<Row className="h2 my-5 text-center">
					<Col>HOME</Col>
					<Col>SCORE</Col>
					<Col>AWAY</Col>
				</Row>
				{/* redners team names and score */}
				<Row className="h2 my-5 text-center">
					<TeamName matchInfo={matchInfo} index={0} />
					{matchInfo.isValid && (
						<Col className="d-flex align-items-center justify-content-center display-1 fw-bolder animate__animated animate__fadeIn">
							{matchInfo.score}
						</Col>
					)}
					<TeamName matchInfo={matchInfo} index={1} />
				</Row>
				{/* renders name of the stadium */}
				<Row className="h2 animate__animated animate__fadeIn mb-4">
					<Col className="text-center">{matchInfo.stadium}</Col>
				</Row>
				{/* renders the date of the match */}
				<Row className="h4 animate__animated animate__fadeIn mb-4">
					<Col className="text-center">{matchInfo.date}</Col>
				</Row>
				{/* if the match is not valid it will display why ('postponed') */}
				{!matchInfo.isValid && (
					<Row className="h2 my-5">
						<Col className="text-center">
							{/* Ten convert type chyba juz niepotrzebny, jesli jest wywolany przy wtorzeniu matchInfo.score */}
							{matchInfo.score.toUpperCase()}
						</Col>
					</Row>
				)}
				{/* renders table only if the match is valid */}
				{matchInfo.isValid && (
					<>
						<div className="d-flex">
							<Button
								className="animate__animated animate__fadeIn mx-auto mb-3"
								onClick={() => setIsOpen(!isOpen)}
								aria-controls="collapse-table"
								aria-expanded={isOpen}
								variant="outline-primary"
								active={isOpen}>
								Click to {collapsed ? "open" : "close"} timeline
								table
							</Button>
						</div>
						<Collapse
							in={isOpen}
							onExited={() => {
								setCollapsed(true);
							}}
							onEnter={() => {
								setCollapsed(false);
							}}>
							<div id="collapse-table">
								<Table
									className="mx-auto table text-center"
									size="sm">
									<thead className="bg-primary-subtle">
										<tr>
											<th>event type</th>
											<th>time</th>
										</tr>
									</thead>
									<tbody>
										{matchInfo?.timeline.map(
											(matchEvent) => (
												<tr
													className="center"
													key={matchEvent.id}>
													<td className="sm:w-50">
														{convertType(
															matchEvent.type
														)}
													</td>
													<td>
														{changeEventTime(
															matchEvent.time
														)}
													</td>
												</tr>
											)
										)}
									</tbody>
								</Table>
							</div>
						</Collapse>
					</>
				)}
			</Container>
		</div>
	);
}
