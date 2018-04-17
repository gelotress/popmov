import React, { Component } from "react";
import {
	Icon,
	Segment,
	Label,
	Sidebar,
	Menu
} from "semantic-ui-react";

export default class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewFilter: false
		};
	}

	handleViewFilter = () => {
		this.setState({ viewFilter: !this.state.viewFilter });
	};

	render() {
		const { selected } = this.props;
		const { filter } = this.props;
		const { viewFilter } = this.state;

		const style = {
			margin: "0"
		};

		return (
			<Sidebar.Pushable>
				<Sidebar
					inverted
					as={Menu}
					vertical
					animation="uncover"
					visible={viewFilter && !selected}
				>
					<Menu.Item
						name="Highest Rated"
						active={filter === "Highest Rated"}
						onClick={this.props.handleChangeFilter}
					>
						Highest Rated
					</Menu.Item>
					<Menu.Item
						name="Popular"
						active={filter === "Popular"}
						onClick={this.props.handleChangeFilter}
					>
						Popular
					</Menu.Item>
					<Menu.Item>
						<Label as="a">
							Logout
						</Label>
						Username@email.com
					</Menu.Item>
				</Sidebar>
				<Sidebar.Pusher>
					<Segment.Group>
						<Segment style={style} inverted>
							<Label
								as="a"
								active={viewFilter && !selected}
								circular
								onClick={this.handleViewFilter}
							>
								<Label
									circular
									active={viewFilter && !selected}
								>
									<Icon
										disabled={viewFilter && !selected}
										fitted
										name="sort content descending"
									/>
								</Label>
								<Label circular color="black">
									U
								</Label>
							</Label>
						</Segment>
						{this.props.children}
					</Segment.Group>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		);
	}
}