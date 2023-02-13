export const getScore = (event) => {
	if (matchValid(event)) {
		return `${event.sport_event_status.home_score} : ${event.sport_event_status.away_score}`;
	}
	return convertType(event.sport_event_status.status);
};

export const matchValid = (event) => {
	// checks if the score is valind number, otherwise it may be posponed or delayed or other.
	if (typeof event.sport_event_status.home_score === "number") {
		return true;
	}
	return false;
};

export const getPeriodScore = (event) => {
	if (matchValid(event)) {
		const periodScores = event.sport_event_status.period_scores[0];
		return `${periodScores.home_score} : ${periodScores.away_score}`;
	}
	return convertType(event.sport_event_status.status);
};

export const formatDate = (date) => {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
};

export const convertType = (type) => {
	const newString = type.replaceAll("_", " ");
	const firstLetter = newString.charAt(0);
	const restOfString = newString.substring(1);
	return firstLetter.toUpperCase() + restOfString;
};

export const changeEventTime = (event) => {
	let date = new Date(event);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	if (hours < 10) {
		hours = `0${hours}`;
	}
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}

	return `${hours}:${minutes}:${seconds}`;
};

export const changeTeamColor = (team, event) => {
	// cheks if the match has valid score
	if (!event.isValid) {
		return "bg-light-subtle";
		// checks if the event was a tie
	} else if (event.isTie) {
		return "bg-warning-subtle";
		// compares the event winner id with the team id
	} else if (team.id === event.winnerId) {
		return "bg-success-subtle";
	} else {
		return "bg-danger-subtle";
	}
};

export const getMatchDetails = (event) => ({
	date: formatDate(new Date(event.sport_event.start_time)),
	teams: event.sport_event.competitors,
	periodScore: getPeriodScore(event),
	score: getScore(event),
	stadium: event.sport_event.venue.name,
	isValid: matchValid(event),
	isTie: event.sport_event_status.match_tie,
	winnerId: event.sport_event_status.winner_id,
	id: event.sport_event.id,
});
