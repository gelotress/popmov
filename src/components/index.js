import React from "react";
import { connect } from "react-redux";
import { accAdd, accLogin } from "./account";

import * as movieActions from "../actions/movieActions";
import * as detailActions from "../actions/detailActions";
import MovieGrid from "./MovieGrid";
import MovieDetail from "./MovieDetail";

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

	componentWillMount() {
		accAdd("User1@email.com", "User1Pass");
		accLogin("User1@email.com", "User1Pass");
	}

	render() {
		return (
			<MovieDetail
				detailReducer={this.props.detailReducer}
				dispatch={{
					fetchDetail: this.props.fetchDetail
				}}
				selected={this.state.selected}
				selectedImg={this.state.selectedImg}
				selectedTitle={this.state.selectedTitle}
				handleUnselect={this.handleUnselect}
			>
				<MovieGrid
					selected={this.state.selected}
					movieReducer={this.props.movieReducer}
					dispatch={{
						clearMovies: this.props.clearMovies,
						fetchPopular: this.props.fetchPopular,
						fetchHighestRated: this.props.fetchHighestRated
					}}
					handleSelect={this.handleSelect}
				/>
			</MovieDetail>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);