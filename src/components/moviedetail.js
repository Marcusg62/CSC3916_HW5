import React, { Component } from "react";
import { fetchMovie, postReview } from "../actions/movieActions";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import { Image } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

class MovieDetail extends Component {
	constructor(props) {
		super(props);
		this.updateDetails = this.updateDetails.bind(this);
		this.submitReview = this.submitReview.bind(this);

		this.state = {
			details: {
				rating: 0,
				review: "",
			},
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		if (this.props.selectedMovie == null && this.props.title) {
			console.log("movieId 2", this.props.title);
			dispatch(fetchMovie(this.props.title));
		}
	}

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        console.log(event)
        this.setState({
            details: updateDetails
        });
    }

	submitReview = async () => {
		console.log("state", this.state);
		if (!this.state.details.rating || !this.state.details.review) {
			alert("Rating and review are required. ");
			return;
		}

		const { dispatch } = this.props;
		let response = await dispatch(
			postReview({
				title: this.props.selectedMovie.title,
				rating: this.state.details.rating,
				quote: this.state.details.review,
                name: localStorage.getItem('username')
			})
		);
        console.log('response', response)
	};

	render() {
		// const DetailInfo = () => {
			if (!this.props.selectedMovie) {
				return <div>Loading....</div>;
			}

			return (
				<Card>
					<Card.Header>Movie Detail</Card.Header>
					<Card.Body>
						<Image
							className="image"
							src={this.props.selectedMovie.imageUrl}
							thumbnail
						/>
					</Card.Body>
					<ListGroup>
						<ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
						<ListGroupItem>
							{this.props.selectedMovie.actors.map((actor, i) => (
								<p key={i}>
									<b>{actor.actor_name}</b> {actor.character_name}
								</p>
							))}
						</ListGroupItem>
						<ListGroupItem>
							<h4>
								Average Rating {this.props.selectedMovie.avgRating}{" "}
								<BsStarFill />
							</h4>
						</ListGroupItem>
					</ListGroup>
					<Card.Body>
						<h5>Reviews</h5>
						{this.props.selectedMovie.reviews.map((review, i) => (
							<p key={i}>
								<b>{review.name}</b>&nbsp; {review.quote}
								&nbsp; {review.rating} <BsStarFill />
							</p>
						))}
						<Form className="form-horizontal">
							<Form.Group controlId="rating">
								<Form.Label>Star Rating 0-5</Form.Label>
								<Form.Control
									onChange={this.updateDetails}
									value={this.state.details.rating}
									type="number"
									placeholder="Enter Rating"
									min="0"
									max="5"
									// id="review"
								/>
							</Form.Group>

							<Form.Group controlId="review">
								<Form.Label>Review</Form.Label>
								<Form.Control
									onChange={this.updateDetails}
									value={this.state.details.review}
									type="text"
									placeholder="Type your review"
									// id="rating"
								/>
							</Form.Group>
							<Button onClick={this.submitReview}>Post Review</Button>
						</Form>{" "}
					</Card.Body>
				</Card>
			);
		};

		// return <DetailInfo />;
	// }
}

const mapStateToProps = (state) => {
	return {
		selectedMovie: state.movie.selectedMovie,
	};
};

export default connect(mapStateToProps)(MovieDetail);
