import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";

import Media from "./DetailAccordion/Media";
import Review from "./DetailAccordion/Review";

export default class DetailAccordion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0
		};
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	render() {
		let { mediaList, reviewList } = this.props;
		let { activeIndex } = this.state;

		return (
			<Accordion styled fluid>
				<Accordion.Title
					active={activeIndex === 0}
					index={0}
					onClick={this.handleClick}
				>
					<Icon name="dropdown" />
					Media
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 0}>
					<Media mediaList={mediaList} />
				</Accordion.Content>
				<Accordion.Title
					active={activeIndex === 1}
					index={1}
					onClick={this.handleClick}
				>
					<Icon name="dropdown" />
					Review
				</Accordion.Title>
				<Accordion.Content active={activeIndex === 1}>
					<Review reviewList={reviewList} />
				</Accordion.Content>
			</Accordion>
		);
	}
}