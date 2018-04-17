import React, { Component } from "react";

import YoutubeVideo from "./YoutubeVideo";

export default class Media extends Component {
	render() {
		const { mediaList } = this.props;

		let mediaArr = mediaList.map(function (item) {
			return (
				<YoutubeVideo key={item.id} src={item.key} />
			);
		});

		return (
			<div>
				{mediaArr}
			</div>
		);
	}
}