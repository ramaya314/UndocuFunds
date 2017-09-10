import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Dimensions from 'react-dimensions';

import MainTheme from '../themes/MainTheme';

import { Grid, Col, Row } from 'react-bootstrap';

import MainNavBar from '../components/MainNavBar';
import MainFooter from '../components/MainFooter';
import Login from '../components/Login';

class HomePage extends Component {
 
	getStyles() {
		const styles = {
		};
		return styles;
	}


	render() {

		const styles = this.getStyles();

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(MainTheme)}>
				<div>
				
		  			<MainNavBar />

					<Grid className="mainPageContentGrid">
						<Row>
							<Col xs={12} lgHidden={true}>
								<Login />
							</Col>
						</Row>
					</Grid>

		  			<MainFooter />
				</div>
			</MuiThemeProvider>
		);
	} 
}

export default Dimensions()(HomePage);
