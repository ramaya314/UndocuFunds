import React from 'react';

import { Navbar, NavItem, NavDropdown, MenuItem, Nav,
			Image, Grid, Row, Col} from 'react-bootstrap';
			
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MainTheme from '../themes/MainTheme'

import Spacer from './Spacer'

class FundApplyConfirmation extends React.Component {

	getStyles() {
		const styles = {
			backToContainer : {
				color: '#000',
				fontSize: '26px',
				fontWeight: '600',
				margin: 10,
			    verticalAlign: 'bottom',
			    padding: '8px 22% 9px 15px',
			    display: 'table',
			    textDecoration: 'none',
			    ':hover': {
			    	color: '#8AB82D !important',
			    }
			},
			backToContent : {
				display: 'table-cell',
				verticalAlign: 'bottom',
				color: '#000',
			},
		};
		return styles;
	}


	render() {

		const styles = this.getStyles();

		return(

			<MuiThemeProvider muiTheme={getMuiTheme(MainTheme)}>
				<div>
					<Spacer space={35} />
					<Grid className="mainPageContentGrid">
						<Row>
							<Col xs={12}>
								<div>
									<a href="/funds" style={styles.backToContainer} className="backButton">
										<span style={styles.backToContent}>Go Back</span>
									</a>
								</div>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<div>
									Thank you! Your application has been submitted.
								</div>
							</Col>
						</Row>
					</Grid>
					<Spacer space={35} />

				</div>
			</MuiThemeProvider>
		);
	}
}

export default FundApplyConfirmation