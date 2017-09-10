import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MainTheme from '../themes/MainTheme';

import { Grid, Col, Row } from 'react-bootstrap';

import FundsMap from '../components/FundsMap';
import FundsList from '../components/FundsList';
import Loading from 'react-loading';

import Utils from '../Utils'

class FundsPage extends Component {
 

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isLoading : true,
		}
		this.getFundsData();
	}   

	getFundsData() {

		let host = window.location.protocol + "//" +
					window.location.hostname +
					(window.location.hostname.toLowerCase().indexOf('localhost') >= 0 ? ":4000" :
						(window.location.port ? ":" + window.location.port : ""));

		let action = "/api/funds/scholarships";

		let fullRequest = host + action;
		var that = this;

		fetch(fullRequest, {
			method : "GET",
		}).then(function(res) {
			if (res.ok) {
				res.json().then(function(json) {
					var data = Utils.prepareGSArrayForTable(json);

					//aplhabetical sort
					/*
					data.sort(function(a, b) {
						var textA = a.Name.toUpperCase();
						var textB = b.Name.toUpperCase();
						return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
					});
					*/

					//console.log(data);
					that.setState({
						data : data,
						isLoading: false,
					});
				}); 
			} else if (res.status === 401) {
				console.log(res);
			}
		}, function(e) {
			console.log(e);
		});
	}

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
								<FundsMap />
							</Col>

							<Col xs={12}>

								<div style={{textAlign:'center', display:(this.state.isLoading ? "" : "none")}}>
									<div style={{width:64,height:64,marginLeft:'auto',marginRight:'auto'}}>
										<Loading type='spin' color='#000' />
									</div>
								</div>

				      			{!this.state.isLoading && 
									<FundsList data={this.state.data} />
								}

							</Col>
						</Row>
					</Grid>

				</div>
			</MuiThemeProvider>
		);
	} 
}

export default FundsPage;
