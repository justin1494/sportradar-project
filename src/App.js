import React, { useEffect, useState } from "react";
import TableComponent from "./components/Table";


function App() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(
			`http://localhost:3001/pipe/https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=${process.env.REACT_APP_API_URL}`
		)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(
						`This is an HTTP error: The status is ${response.status}`
					);
				}
				const data = await response.json();
				setData(data);
			})
			.catch((err) => {
				setError(err.message);
				setData(null);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return <TableComponent data={data} loading={loading} error={error} />;
}

export default App;
