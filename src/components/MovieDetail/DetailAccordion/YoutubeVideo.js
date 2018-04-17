import React, { Component } from "react";

export default class YoutubeVideo extends Component {
	render() {
		const baseURL = "https://www.youtube.com/embed/";
		const style = {
			border: 0
		};
		let src = this.props.src;
		let id = this.props.id;

		return (
			<iframe
				style={style}
				width="100%"
				title={id}
				src={baseURL + src}
			/>
		);
	}
}