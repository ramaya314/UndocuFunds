import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Dimensions from 'react-dimensions';

import MainTheme from '../themes/MainTheme';

import { Grid, Col, Row } from 'react-bootstrap';


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
				 	HELLO UNDOCUHACKS!!!!!
				</div>
			</MuiThemeProvider>
		);
	} 
}

export default Dimensions()(HomePage);
