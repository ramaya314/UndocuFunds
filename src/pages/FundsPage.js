import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MainTheme from '../themes/MainTheme';

import { Grid, Col, Row } from 'react-bootstrap';

import FundsMap from '../components/FundsMap';
import FundsList from '../components/FundsList';
import Loading from 'react-loading';

import EnhancedTextField from '../components/EnhancedTextField';
import Spacer from '../components/Spacer';

import Utils from '../Utils';

import ProfilePage from '../pages/ProfilePage';


import {Tabs, Tab} from 'material-ui/Tabs';

class FundsPage extends Component {
 
	constructor(props) {
		super(props);
		this.state = {
			tabValue: 0,
			selectedState: '',
			nameFilter: '',
			legalStatusRquiredFilter: '',
			organizationFilter: '',
		};
	}

	getStyles() {
		const styles = {
		};
		return styles;
	}

	handleTabChange = (value) => {
		this.setState({
			tabValue: value,
		});
	};

	onStateClick = (state) => {
		this.setState({
			selectedState: state,
		});
	};

	render() {

		const styles = this.getStyles();

		console.log(this.props);
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(MainTheme)}>
				<div>
					<Spacer space={15} />
					{this.props.authed &&
						<div>
							<ProfilePage />
							<Spacer space={15} />
						</div>
					}

					<Grid className="mainPageContentGrid">
						<Row>
							<Col xsHidden={true} smHidden={true} md={12}>
								<FundsMap onStateClick={this.onStateClick} />
							</Col>

							<Col xs={12}>
								<Tabs value={this.state.tabValue} onChange={this.handleTabChange} >
									<Tab label="Scholarships" value={0} >
										<div>
											<FundsList type={"scholarships"} authed={this.props.authed} stateFilter={this.state.selectedState} />
										</div>
									</Tab>
									<Tab label="Legal Aid" value={1} >
										<div>
											<FundsList type={"legalaid"} authed={this.props.authed} stateFilter={this.state.selectedState} />
										</div>
									</Tab>
									<Tab label="Health" value={2} >
										<div>
											<FundsList type={"health"} authed={this.props.authed} stateFilter={this.state.selectedState} />
										</div>
									</Tab>


								</Tabs>
							</Col>
						</Row>
					</Grid>

				</div>
			</MuiThemeProvider>
		);
	} 
}

export default FundsPage;
