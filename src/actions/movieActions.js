import actionTypes from "../constants/actionTypes";
import runtimeEnv from "@mars/heroku-js-runtime-env";

function moviesFetched(movies) {
	console.log("moviesFetched", movies);
	return {
		type: actionTypes.FETCH_MOVIES,
		movies: movies,
	};
}

function movieFetched(movie) {
	console.log("movieFetched", movie);
	return {
		type: actionTypes.FETCH_MOVIE,
		selectedMovie: movie[0],
	};
}

function movieSet(movie) {
	return {
		type: actionTypes.SET_MOVIE,
		selectedMovie: movie,
	};
}

export function setMovie(movie) {
	return (dispatch) => {
		dispatch(movieSet(movie));
	};
}

export function fetchMovie(movieId) {
	console.log("fetchMovie", movieId);
	const env = runtimeEnv();
	return (dispatch) => {
		return fetch(`${env.REACT_APP_API_URL}/movies/${movieId}?reviews=true`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
			mode: "cors",
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((res) => {
				dispatch(movieFetched(res));
			})
			.catch((e) => console.log(e));
	};
}

export function fetchMovies() {
	const env = runtimeEnv();
	return (dispatch) => {
		return fetch(`${env.REACT_APP_API_URL}/movies?reviews=true`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
			mode: "cors",
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				console.log("response", response);
				return response.json();
			})
			.then((res) => {
				dispatch(moviesFetched(res));
			})
			.catch((e) => console.log(e));
	};
}

export function postReview(review_data) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors',
            body: JSON.stringify(review_data)
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            // console.log(res.json())
            window.location.reload();
        }).catch((e) => console.log(e));
    }
}