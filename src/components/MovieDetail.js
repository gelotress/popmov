import React, { Component } from "react";
import {
	Sidebar,
	Segment,
	Image,
	Label,
	Card,
	Icon
} from "semantic-ui-react";

import DetailAccordion from "./MovieDetail/DetailAccordion";
import { addFavorite, getFavorites, removeFavorite } from "./Favorite";

export default class MovieDetail extends Component {
	render() {
		const	hasSelected = this.props.selected ? true : false;
		const title = this.props.selectedTitle;
		const img = this.props.selectedImg;
		const {
			payload: {
				data: {
					id,
					original_title: originalTitle,
					vote_average: voteAverage,
					overview,
					release_date: releaseDate,
					videos: { results: mediaList },
					reviews: { results: reviewList }
				}
			}
		} = this.props.detailReducer;
		const dispatch = this.props.dispatch;
		const favorites = getFavorites();
		const isFavorite = favorites.some(function (item) {
			return item.id === id;
		});
		const heartIcon = isFavorite ? "heart" : "empty heart";

		return (
			<Sidebar.Pushable as={Segment}>
				<Sidebar
					animation="uncover"
					direction="right"
					width="wide"
					visible={hasSelected}
				>
					<Card fluid>
						<Card.Content as={Segment} color="grey">
							<Label
								as="a"
								circular
								onClick={this.props.handleUnselect}
							>
								<Icon fitted name="close" />
							</Label>
							<Label>
								<Icon name="star" />
								{voteAverage}
							</Label>
							<Label as="a" onClick={() => {
								if (isFavorite) {
									removeFavorite(id);
								} else {
									addFavorite(id, img);
								}
								this.props.handleChangeFavorites();
							}}>
								<Icon name={heartIcon} />
								Favorite
							</Label>
						</Card.Content>
						<Image src={img} />
						<Card.Content>
							<Card.Header>
								{title}
							</Card.Header>
							<Card.Meta>{originalTitle} ({releaseDate}) </Card.Meta>
							<Card.Description>{overview}</Card.Description>
						</Card.Content>
						<DetailAccordion
							mediaList={mediaList}
							reviewList={reviewList}
						/>
					</Card>
				</Sidebar>
				<Sidebar.Pusher dimmed={hasSelected}>
					{this.props.children}
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}
}