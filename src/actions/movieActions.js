import axios from "axios";
import apiGeneral from "../apiGeneral";
import { getEntry } from "../components/LocalDatabase";
import { getLoggedIn } from "../components/Account";

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

export function fetchFavorites(page=1) {
	const account = getLoggedIn();
	const favorites = getEntry("Accounts", account).favorites;
	const pageSize = favorites.length > 20 ? 20 : favorites.length;

	return {
		type: "FETCH_FAVORITES_FULFILLED",
		payload: {
			data: {
				results: favorites.slice((page - 1) * pageSize, page * pageSize),
				page: page
			}
		}
	};
}