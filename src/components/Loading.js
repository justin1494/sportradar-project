import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
	return (
		<div
			className="vh-100 d-flex flex-column justify-content-center align-items-center container gap-3"
			data-testid="loading">
			<Spinner animation="grow" size="lg" data-testid="spinner"></Spinner>
			<h1> Data is loading...</h1>
		</div>
	);
}
