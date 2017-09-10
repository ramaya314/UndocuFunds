import React from 'react';

import Paper from 'material-ui/Paper';

import FundsTableRow from './FundsTableRow';
import FundsTableHeader from './FundsTableHeader';
import Loading from 'react-loading';

import Utils from '../Utils';

import Spacer from './Spacer';

class FundsList extends React.Component {

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

		let action = "/api/funds/" + this.props.type;

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
			paperStyle : {
				margin: 0,
				padding: 0,
			},
		}
		return styles;
	}

	render() {
		var styles = this.getStyles();

		var that = this;

		var filteredData = this.state.data.filter(fund => {

			if(that.props.stateFilter.length > 0 && that.props.stateFilter.toLowerCase().trim() != fund.state.toLowerCase().trim()) {
				return false;
			}
			return true;
		});



		return(
			<div>
				<div style={{textAlign:'center', display:(this.state.isLoading ? "" : "none")}}>
					<div style={{width:64,height:64,marginLeft:'auto',marginRight:'auto'}}>
						<Loading type='spin' color='#000' />
					</div>
				</div>


      			{!this.state.isLoading && 
					<Paper style={styles.paperStyle} zDepth={3} >
						<FundsTableHeader authed={that.props.authed} type={that.props.type}/>
						{filteredData.length > 0 && filteredData.map(function(fund, i) {
							return(
								<FundsTableRow data={fund} type={that.props.type} key={i} index={i} authed={that.props.authed} />
							)
						})}

						{filteredData.length <= 0 && 
							<div style={{
								textAlign: 'center',
								fontSize: 18,
								padding: 20,
							}}>
								No Data Found.
							</div>
						}
					</Paper>
				}

				<Spacer space={30} />
			</div>
		);
	}
}

export default FundsList