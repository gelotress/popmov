export default function detailReducer(state={
	payload: {
		data: {
			original_title: null,
			vote_average: null,
			overview: null,
			release_date: null,
			videos: { results: [] },
			reviews: { results: [] }
		}
	},
	fetching: false,
	error: null
}, action) {
	switch (action.type) {
		case "FETCH_DETAIL_PENDING": {
			return {...state, fetching: true};
		}
		case "FETCH_DETAIL_FULFILLED": {
			return {
				...state,
				payload: action.payload,
				fetching: false
			};
		}
		case "FETCH_DETAIL_REJECTED": {
			return {...state, error: action.payload, fetching:false};
		}
		default: {
			return state;
		}
	}
}