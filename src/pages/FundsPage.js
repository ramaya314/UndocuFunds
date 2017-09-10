import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MainTheme from '../themes/MainTheme';

import { Grid, Col, Row } from 'react-bootstrap';

class FundsPage extends Component {
 
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


					<Grid className="mainPageContentGrid">
						<Row>
							<Col xs={12}>
								Funds
							</Col>
						</Row>
					</Grid>

				</div>
			</MuiThemeProvider>
		);
	} 
}

export default FundsPage;
