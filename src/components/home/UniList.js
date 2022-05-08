import { useState, useEffect } from "react";
import { API_URL } from "../../constants/api";
import UniItem from "./UniItem";
import Spinner from "react-bootstrap/Spinner";

function UniList() {
	const [unis, setUni] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function fetchData() {
			try {
				const response = await fetch(API_URL);

				if (response.ok) {
					const json = await response.json();
					setUni(json);
				} else {
					setError("An error occurred");
				}
			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	if (loading) {
		return (
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		)
	}

	if (error) {
		return <div>An error occurred: {error}</div>;
	}

	return (
		<>
			{unis.map(function (uni) {
                const { id, name, price, rating} = uni;
				return <UniItem key={id} id={id} name={name} price={price} rating={rating} />
			})}
		</>
	);
}

export default UniList;