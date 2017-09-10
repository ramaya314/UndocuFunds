import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MainTheme from '../themes/MainTheme';

import { Grid, Col, Row } from 'react-bootstrap';

const userStore = require('../stores/user');

function getUserState() {
	return {
		user: userStore.getUser()
	}
}

class ProfilePage extends Component {
 state = getUserState()

 componentDidMount() {
	 userStore.addChangeListener(function () {
		 this.setState(getUserState())
	 }.bind(this));
 }
	getStyles() {
		const styles = {
		};
		return styles;
	}

	render() {
		const styles = this.getStyles();
		const {user} = this.state;
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(MainTheme)}>
				<div>

					<Grid className="mainPageContentGrid">
						<Row>
							<Col xs={12}>
								<Row>
								{user.firstName}
								</Row>
								<Row>
								{user.lastName}
								</Row>
								<Row>
								{user.email}
								</Row>
							</Col>
						</Row>
					</Grid>

				</div>
			</MuiThemeProvider>
		);
	}
}

export default ProfilePage;
