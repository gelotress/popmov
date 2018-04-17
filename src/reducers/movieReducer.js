export default function movieReducer(state={
	movies: [],
	pages: 0,
	fetching: false,
	error: null
}, action) {
	switch (true) {
		case /CLEAR_MOVIES/.test(action.type): {
			return {...state, ...action.payload};
		}
		case /^FETCH_(?!.*DETAIL).*_PENDING$/.test(action.type): {
			return {...state, fetching: true};
		}
		case /^FETCH_(?!.*DETAIL).*_FULFILLED$/.test(action.type): {
			return {
				...state,
				movies: state.movies.concat(action.payload.data.results),
				pages: action.payload.data.page,
				fetching: false
			};
		}
		case /\w*_REJECTED$/.test(action.type): {
			return {...state, error: action.payload, fetching:false};
		}
		default: {
			return state;
		}
	}
};