import React from "react";
import { connect } from "react-redux";

import * as movieActions from "../actions/movieActions";
import * as detailActions from "../actions/detailActions";
import MovieGrid from "./MovieGrid";
import MovieDetail from "./MovieDetail";
import {
	getAcc,
	makeAcc,
	delAcc,
	loginAcc,
	logoutAcc,
	getLoggedIn
} from "./Account";
import { getFavorites } from "./Favorite";

function mapStateToProps(state) {
	return {
			movieReducer: state.movieReducer,
			detailReducer: state.detailReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		clearMovies: function () {
			dispatch(movieActions.clearMovies());
		},
		fetchPopular: function (page) {
			dispatch(movieActions.fetchPopular(page));
		},
		fetchHighestRated: function (page) {
			dispatch(movieActions.fetchHighestRated(page));
		},
		fetchFavorites: function (page) {
			dispatch(movieActions.fetchFavorites(page));
		},
		fetchDetail: function (movieId) {
			dispatch(detailActions.fetchDetail(movieId));
		}
	};
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			selectedId: null,
			selectedImg: null
		};
	}

	handleSelect = (selected) => {
		const dispatch = {fetchDetail: this.props.fetchDetail};
		const selectedId = selected.id;

		if (!this.state.selected && selected.src) {
			this.setState({
				selected: true,
				selectedImg: selected.src,
				selectedTitle: selected.alt
			});
			dispatch.fetchDetail(selectedId);
		}
	};

	handleUnselect = () => {
		if (this.state.selected) {
			this.setState({
				selected: null
			});
		}
	};

	handleChangeFavorites = () => {
		this.setState({ favorites: getFavorites() });
	};

	componentDidMount() {
		const user = "User@email.com";
		const pass = "userPass";

		window.getAcc = getAcc;
		window.makeAcc = makeAcc;
		window.delAcc = delAcc;
		window.loginAcc = loginAcc;
		window.logoutAcc = logoutAcc;
		window.getLoggedIn = getLoggedIn;

		makeAcc("User@email.com", "userPass");
		loginAcc(user, pass);
	}

	render() {
		return (
			<MovieDetail
				detailReducer={this.props.detailReducer}
				dispatch={{
					fetchDetail: this.props.fetchDetail,
					fetchFavorites: this.props.fetchFavorites
				}}
				selected={this.state.selected}
				selectedImg={this.state.selectedImg}
				selectedTitle={this.state.selectedTitle}
				handleUnselect={this.handleUnselect}
				handleChangeFavorites={this.handleChangeFavorites}
			>
				<MovieGrid
					selected={this.state.selected}
					movieReducer={this.props.movieReducer}
					dispatch={{
						clearMovies: this.props.clearMovies,
						fetchPopular: this.props.fetchPopular,
						fetchHighestRated: this.props.fetchHighestRated,
						fetchFavorites: this.props.fetchFavorites
					}}
					handleSelect={this.handleSelect}
					handleChangeFavorites={this.handleChangeFavorites}
				/>
			</MovieDetail>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);