import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const AddReview = (props) => {
	console.log("props", props);
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");

	let updateRating = (event) => {
		// console.log('event', event)
		setRating(event.target.value);
	};

	let updateReview = (event) => {
		// console.log('event', event)
		setReview(event.target.value);
	};

	let submitReview = async () => {
		let myBody = {
			title: props.movie.title,
			name: localStorage.getItem("username"),
			quote: review,
			rating: rating,
		};

		console.log("body", myBody);

		if (!rating || !review) {
			alert("Rating and review are required. ");
			return;
		}

		try {
			if (!result.ok) {
				throw Error(response.statusText);
			}
		} catch (error) {
			console.log("error", error);
		}
		const env = runtimeEnv();

		let result = await fetch(`${env.REACT_APP_API_URL}/reviews`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
			mode: "cors",
			body: myBody,
		});
	};

	return (
		<Form className="form-horizontal">
			<Form.Group controlId="rating">
				<Form.Label>Star Rating 0-5</Form.Label>
				<Form.Control
					onChange={updateRating}
					value={rating}
					type="number"
					placeholder="Enter Rating"
					min="0"
					max="5"
				/>
			</Form.Group>

			<Form.Group controlId="review">
				<Form.Label>Review</Form.Label>
				<Form.Control
					onChange={updateReview}
					value={review}
					type="text"
					placeholder="Type your review"
				/>
			</Form.Group>
			<Button onClick={submitReview}>Post Review</Button>
		</Form>
	);
};

export default AddReview;
