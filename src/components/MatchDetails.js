import "animate.css";
import Loading from "components/Loading";
import TeamName from "components/TeamName";
import Players from "components/Players";
import Timeline from "components/Timeline";
import { getMatchDetails } from "helpers/helpers";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MatchDetails() {
	const { matchId } = useParams(null);
	const [matchInfo, setMatchInfo] = useState();

	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		fetch(
			`http://localhost:3005/pipe/https://api.sportradar.us/soccer/trial/v4/en/sport_events/${matchId}/timeline.json?api_key=${process.env.REACT_APP_API_URL}`
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
				{/* if the match is not valid it will display why (for example - 'postponed') */}
				{!matchInfo.isValid && (
					<Row className="h2 my-5">
						<Col className="text-center">
							{matchInfo.score.toUpperCase()}
						</Col>
					</Row>
				)}

				{/* renders table only if the match is valid */}
				{matchInfo.isValid && (
					<>
						<Players matchInfo={matchInfo} />
						<Timeline matchInfo={matchInfo} />
					</>
				)}
			</Container>
		</div>
	);
}
