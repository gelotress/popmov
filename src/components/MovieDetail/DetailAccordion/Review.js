import React, { Component } from "react";
import { Comment } from "semantic-ui-react";

export default class Review extends Component {
	render() {
		const { reviewList } = this.props;

		let reviewArr = reviewList.map(function (item) {
			let { author, content, id } = item;
			return (
				<Comment key={id}>
					<Comment.Author>
						{author}
					</Comment.Author>
					<Comment.Text>
						{content}
					</Comment.Text>
				</Comment>
			);
		});

		return (
			<Comment.Group>
				{reviewArr}
			</Comment.Group>
		);
	}
}