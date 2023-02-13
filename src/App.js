import { Context } from "components/Context";
import HomepageComponent from "components/Homepage";
import { getMatchDetails } from "helpers/helpers";
import { useEffect, useState } from "react";

function App() {
	// mozna doprecyzować nazwy data i seasonsData, bo w sumie to seasonsData moze trzymać informacje o wynikach meczy w danym sezonie
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [seasonsData, setSeasonsData] = useState(null);
	const [displayedSeason, setDisplayedSeason] = useState(null);
	useEffect(() => {
		setLoading(true);
		fetch(
			`http://localhost:3001/pipe/https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=${process.env.REACT_APP_API_URL}`
		)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}

				const data = await response.json();
				setSeasonsData(data);
				setDisplayedSeason(data.seasons[0]);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (displayedSeason) {
			setLoading(true);
			fetch(
				`http://localhost:3001/pipe/https://api.sportradar.us/soccer/trial/v4/en/seasons/${displayedSeason.id}/schedules.json?api_key=${process.env.REACT_APP_API_URL}`
			)
				.then(async (response) => {
					if (!response.ok) {
						throw new Error(
							`This is an HTTP error: The status is ${response.status}`
						);
					}
					const responseJson = await response.json();

					const adaptedSchedules = responseJson.schedules.map(
						(schedule) => getMatchDetails(schedule)
					);

					const data = {
						...responseJson,
						schedules: adaptedSchedules,
					};
					setData(data);
					setError(null);
				})
				.catch((err) => {
					setError(err.message);
					setData(null);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [displayedSeason]);

	const contextValue = {
		data,
		loading,
		error,
		seasonsData,
		setDisplayedSeason,
		displayedSeason,
	};

	return (
		<Context.Provider value={contextValue}>
			<div className="mx-3">{<HomepageComponent />}</div>
		</Context.Provider>
	);
}

export default App;
