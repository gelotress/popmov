import axios from "axios";
import apiGeneral from "../apiGeneral";

const baseURL = apiGeneral.baseURL;
const apiKey = apiGeneral.apiKey;

export function clearMovies() {
	return {
		type: "CLEAR_MOVIES",
		payload: {movies: [], pages: 0}
	}
}

export function fetchPopular(page=1) {
	let url = "".concat(
		baseURL,
		"movie/popular?api_key=",
		apiKey,
		"&page=",
		page
	);

	return {
		type: "FETCH_POPULAR",
		payload: axios.get(url)
	};
}

export function fetchHighestRated(page=1) {
	let url = "".concat(
		baseURL,
		"movie/top_rated?api_key=",
		apiKey,
		"&page=",
		page
	);

	return {
		type: "FETCH_HIGHEST_RATED",
		payload: axios.get(url)
	};
}