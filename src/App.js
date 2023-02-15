import { Context } from "components/Context";
import HomepageComponent from "components/Homepage";
import MatchDetails from "components/MatchDetails";
import ScrollToTop from "components/ScrollToTop";
import { getMatchDetails } from "helpers/helpers";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [seasonsData, setSeasonsData] = useState(null);
	const [displayedSeason, setDisplayedSeason] = useState(null);
	const [searchableData, setSearchableData] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetch(
			`http://localhost:3005/pipe/https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=${process.env.REACT_APP_API_URL}`
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
				`http://localhost:3005/pipe/https://api.sportradar.us/soccer/trial/v4/en/seasons/${displayedSeason.id}/schedules.json?api_key=${process.env.REACT_APP_API_URL}`
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
					setSearchableData(data);
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
		setData,
		loading,
		error,
		seasonsData,
		setDisplayedSeason,
		displayedSeason,
		searchableData,
		setSearchableData,
	};

	return (
		<Context.Provider value={contextValue}>
			<ScrollToTop />
			<div className="p-3">
				<Routes>
					<Route index element={<HomepageComponent />} />
					<Route path=":matchId" element={<MatchDetails />} />
				</Routes>
			</div>
		</Context.Provider>
	);
}

export default App;
