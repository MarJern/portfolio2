import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_PROD_URL } from "../../constants/api";
import Heading from "../layout/Heading";
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner";

function UniDetail() {
	const [uni, setUni] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	let navigate = useNavigate();

	const { id } = useParams();

	if (!id) {
		navigate.push("/");
	}

	const url = API_PROD_URL + "/" + id + '.json';

	useEffect(
		function () {
			async function fetchData() {
				try {
					const response = await fetch(url);

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
		},
		[url]
	);

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
        <Container className="wrapper my-3 m-auto">
            <Heading title="Detail Page" />
				<div className="shadow detail__wrapper">
					<h2>{uni.name}</h2>
					<p>Price: {uni.price}</p>
					<p>About: {uni.description}</p>
				</div>
		</Container>
	);
}

export default UniDetail;