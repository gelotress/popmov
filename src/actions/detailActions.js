import axios from "axios";
import apiGeneral from "../apiGeneral";

const baseURL = apiGeneral.baseURL;
const apiKey = apiGeneral.apiKey;

export function fetchDetail(movieId) {
	let url = "".concat(
		baseURL,
		"movie/",
		movieId,
		"?api_key=",
		apiKey,
		"&append_to_response=videos,reviews"
	);

	return {
		type: "FETCH_DETAIL",
		payload: axios.get(url)
	};
}