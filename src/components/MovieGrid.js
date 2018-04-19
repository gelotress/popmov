import React, { Component } from "react";
import {
	Card,
	Image,
	Grid,
	Segment,
	Icon,
	Label
} from "semantic-ui-react";

import Filter from "./MovieGrid/Filter";

export default class MovieGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: "Highest Rated"
		};
	}

	loadPage = (init) => {
		const fetching = this.props.movieReducer.fetching;

		if (!fetching) {
			const { pages } = this.props.movieReducer;
			const { dispatch } = this.props;
			const { filter } = this.state;

			switch (filter) {
				case "Highest Rated": {
					dispatch.fetchHighestRated(pages + 1);
					break;
				}
				case "Popular": {
					dispatch.fetchPopular(pages + 1);
					break;
				}
				case "Favorites": {
					dispatch.fetchFavorites(pages + 1);
					break;
				}
				default: {
					break;
				}
			}
		}
	};

	handleChangeFilter = (e, { name }) => {
		const { dispatch } = this.props;

		dispatch.clearMovies();
		this.setState({ filter: name });

		switch (name) {
			case "Highest Rated": {
				dispatch.fetchHighestRated(1);
				break;
			}
			case "Popular": {
				dispatch.fetchPopular(1);
				break;
			}
			case "Favorites": {
				dispatch.fetchFavorites(1);
				break;
			}
			default: {
				break;
			}
		}
	};

	componentDidMount() {
		this.loadPage();
	}

	render() {
		const style = {
			height: "100vh",
			maxHeight: "100vh",
			overflow: "auto"
		};

		const posterSize = "original/";
		const posterBaseURL = "https://image.tmdb.org/t/p/" + posterSize;

		const { movies, fetching } = this.props.movieReducer;
		const loaderIcon = fetching ? "circle notched" : "ellipsis horizontal";

		const dataViewArray = movies.map((item) => {
			return (
				<Grid.Column
					key={item.id}
					onClick={
						(e) => {
							this.props.handleSelect(e.target);
						}
					}
				>
					<Card link fluid>
						<Image
							id={item.id}
							src={
								posterBaseURL +
								item.poster_path
							} 
							alt={item.title}
						/>
					</Card>
				</Grid.Column>
			);
		});

		return (
			<Segment inverted style={style}>
				<Filter
					selected={this.props.selected}
					filter={this.state.filter}
					handleChangeFilter={this.handleChangeFilter}
				>
					<Segment inverted>
						<Grid columns={10} doubling>
							{dataViewArray}
						</Grid>
					</Segment>
					<Segment textAlign="center" inverted>
						<Label size="big" circular as="a" onClick={this.loadPage}>
							<Icon
								name={loaderIcon}
								fitted
								loading={fetching}
								disabled={fetching}
							>
							</Icon>
						</Label>
					</Segment>
				</Filter>
			</Segment>
		);
	}
}