import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import MainTheme from '../themes/MainTheme';
import InverseTheme from '../themes/InverseTheme';

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
			filingFeeFilter: '',
			organizationFilter: '',
			privateFilter: null,
			publicFilter: null,
			nonProfitFilter: null,
		};
	}

	getStyles() {
		const styles = {
		};
		return styles;
	}

	handleTextFieldChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
	};


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

	handleLegalRequirementChange = (event, index, value) => {
		console.log(value);
		this.setState({
			legalStatusRquiredFilter: value,
		});
	};

	handleFilingFeeRequirementChange = (event, index, value) => {
		this.setState({
			filingFeeFilter: value,
		});
	};

	handlePrivateRequirementChange = (event, index, value) => {
		this.setState({
			privateFilter: value,
		});
	};

	handlePublicRequirementChange = (event, index, value) => {
		this.setState({
			publicFilter: value,
		});
	};

	handleNonProfitRequirementChange = (event, index, value) => {
		this.setState({
			nonProfitFilter: value,
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
										<MuiThemeProvider muiTheme={getMuiTheme(InverseTheme)}>
											<div style={{backgroundColor: "rgb(33, 33, 33)"}} >

													<Row>
														<Col xs={12} sm={12} md={6} lg={6} >
														    <EnhancedTextField name="nameFilter" 
														    	value={this.state.nameFilter}
														    	hintText="Scholarship Name" 
														    	floatingLabelText="Scholarship Name" 
																fullWidth={true} 
														    	onChange={this.handleTextFieldChange} />
												    	</Col>

														<Col xs={12} sm={12} md={6} lg={6} >
															<SelectField
																value={this.state.legalStatusRquiredFilter}
																onChange={this.handleLegalRequirementChange}
																floatingLabelText="Legal Requirements"
																floatingLabelFixed={true}
																hintText="Legal Requirements" >
																{[
																	<MenuItem key={1} value="All" primaryText="All" />,
																	<MenuItem key={2} value="Undocumented/DACA" primaryText="Undocumented/DACA" />,
																	<MenuItem key={3} value="General" primaryText="General" />,
																]}
															</SelectField>
												    	</Col>
												    </Row>
											</div>
										</MuiThemeProvider>
										<div>
											<FundsList type={"scholarships"} 
												authed={this.props.authed} 
												stateFilter={this.state.selectedState} 
												nameFilter={this.state.nameFilter}
												legalStatusRquiredFilter={this.state.legalStatusRquiredFilter}/>
										</div>
									</Tab>
									<Tab label="Legal Aid" value={1} >

										<MuiThemeProvider muiTheme={getMuiTheme(InverseTheme)}>
											<div style={{backgroundColor: "rgb(33, 33, 33)"}} >

													<Row>
														<Col xs={12} sm={12} md={6} lg={6} >
														    <EnhancedTextField name="organizationFilter" 
														    	value={this.state.organizationFilter}
														    	hintText="Organization Name" 
														    	floatingLabelText="Organization Name" 
																fullWidth={true} 
														    	onChange={this.handleTextFieldChange} />
												    	</Col>

														<Col xs={12} sm={12} md={6} lg={6} >
															<SelectField
																value={this.state.filingFeeFilter}
																onChange={this.handleFilingFeeRequirementChange}
																floatingLabelText="Filing Fee Included"
																floatingLabelFixed={true}
																hintText="Filing Fee Included" >
																{[
																	<MenuItem key={1} value="" primaryText="All" />,
																	<MenuItem key={2} value="Yes" primaryText="Yes" />,
																	<MenuItem key={3} value="No" primaryText="No" />,
																]}
															</SelectField>
												    	</Col>
												    </Row>
											</div>
										</MuiThemeProvider>
										<div>
											<FundsList type={"legalaid"} 
												authed={this.props.authed} 
												stateFilter={this.state.selectedState} 
												organizationFilter={this.state.organizationFilter}
												filingFeeFilter={this.state.filingFeeFilter}/>
										</div>
									</Tab>
									<Tab label="Health" value={2} >

										<MuiThemeProvider muiTheme={getMuiTheme(InverseTheme)}>
											<div style={{backgroundColor: "rgb(33, 33, 33)"}} >

													<Row>
														<Col xs={12} sm={12} md={6} lg={6} >
														    <EnhancedTextField name="nameFilter" 
														    	value={this.state.nameFilter}
														    	hintText="Fund Name" 
														    	floatingLabelText="Fund Name" 
																fullWidth={true} 
														    	onChange={this.handleTextFieldChange} />
												    	</Col>

														<Col xs={12} sm={12} md={6} lg={6} >
															<SelectField
																value={this.state.privateFilter}
																onChange={this.handlePrivateRequirementChange}
																floatingLabelText="Private"
																floatingLabelFixed={true}
																hintText="Private" >
																{[
																	<MenuItem key={1} value="" primaryText="All" />,
																	<MenuItem key={2} value="TRUE" primaryText="Yes" />,
																	<MenuItem key={3} value="FALSE" primaryText="No" />,
																]}
															</SelectField>
												    	</Col>

														<Col xs={12} sm={12} md={6} lg={6} >
															<SelectField
																value={this.state.publicFilter}
																onChange={this.handlePublicRequirementChange}
																floatingLabelText="Public"
																floatingLabelFixed={true}
																hintText="Public" >
																{[
																	<MenuItem key={1} value="" primaryText="All" />,
																	<MenuItem key={2} value="TRUE" primaryText="Yes" />,
																	<MenuItem key={3} value="FALSE" primaryText="No" />,
																]}
															</SelectField>
												    	</Col>

														<Col xs={12} sm={12} md={6} lg={6} >
															<SelectField
																value={this.state.nonProfitFilter}
																onChange={this.handleNonProfitRequirementChange}
																floatingLabelText="Non-Profit"
																floatingLabelFixed={true}
																hintText="Non-Profit" >
																{[
																	<MenuItem key={1} value="" primaryText="All" />,
																	<MenuItem key={2} value="TRUE" primaryText="Yes" />,
																	<MenuItem key={3} value="FALSE" primaryText="No" />,
																]}
															</SelectField>
												    	</Col>
												    </Row>
											</div>
										</MuiThemeProvider>
										<div>
											<FundsList type={"health"} 
												authed={this.props.authed} 
												stateFilter={this.state.selectedState}
												nameFilter={this.state.nameFilter}
												legalStatusRquiredFilter={this.state.legalStatusRquiredFilter}
												organizationFilter={this.state.organizationFilter}
												filingFeeFilter={this.state.filingFeeFilter}
												publicFilter={this.state.publicFilter}
												privateFilter={this.state.privateFilter}
												nonProfitFilter={this.state.nonProfitFilter} />
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
