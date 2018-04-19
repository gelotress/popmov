import React, { Component } from "react";
import { getLoggedIn, logoutAcc } from "../Account";
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

	componentDidMount() {
		this.setState({ account: getLoggedIn() });
	}

	render() {
		const userPart = this.state.account ?
			this.state.account.replace(/@+.*/, "") :
			"No user logged in";
		const userFront = userPart.substring(0, 1);

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
					<Menu.Item
						name="Favorites"
						active={filter === "Favorites"}
						onClick={this.props.handleChangeFilter}
					>
						Favorites
					</Menu.Item>
					<Menu.Item>
						<Label as="a" onClick={ () => {
							this.setState({ account: "" });
							logoutAcc();
						} }>
							Logout
						</Label>
						{userPart}
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
									{userFront}
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