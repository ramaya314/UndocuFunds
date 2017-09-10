import React from 'react';

import Paper from 'material-ui/Paper';

import FundsTableRow from './FundsTableRow';
import FundsTableHeader from './FundsTableHeader';
import Loading from 'react-loading';

import Utils from '../Utils';

import Spacer from './Spacer';

import SearchInput, {createFilter} from 'react-search-input'

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']

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

			console.log(this.props.publicFilter);

		if(filteredData[0] != null && filteredData[0].nameOfTheScholarship != null)
    		filteredData = filteredData.filter(createFilter(this.props.nameFilter, ["nameOfTheScholarship"]));

		if(filteredData[0] != null && filteredData[0].statusRequired != null)
    		filteredData = filteredData.filter(createFilter(this.props.legalStatusRquiredFilter, ["statusRequired"]));

		if(filteredData[0] != null && filteredData[0].nameOfTheOrganization != null)
    		filteredData = filteredData.filter(createFilter(this.props.organizationFilter, ["nameOfTheOrganization"]));

		if(filteredData[0] != null && filteredData[0].filingFeeIncluded != null)
    		filteredData = filteredData.filter(createFilter(this.props.filingFeeFilter, ["filingFeeIncluded"]));

		if(filteredData[0] != null && filteredData[0].public != null && this.props.publicFilter != null)
    		filteredData = filteredData.filter(createFilter(this.props.publicFilter, ["public"]));

		if(filteredData[0] != null && filteredData[0].private != null && this.props.privateFilter != null)
    		filteredData = filteredData.filter(createFilter(this.props.privateFilter, ["private"]));

		if(filteredData[0] != null && filteredData[0].nonprofit != null && this.props.nonProfitFilter != null)
    		filteredData = filteredData.filter(createFilter(this.props.nonProfitFilter, ["nonprofit"]));

		if(filteredData[0] != null && filteredData[0].name != null)
    		filteredData = filteredData.filter(createFilter(this.props.nameFilter, ["name"]));

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