import React from 'react';

import Paper from 'material-ui/Paper';

import FundsTableRow from './FundsTableRow';

class FundsList extends React.Component {

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
		
		return(
			<Paper  style={styles.paperStyle} zDepth={3} >
				{this.props.data.map(function(fund, i) {
					return(
						<FundsTableRow data={fund} />
					)
				})}
			</Paper>
		);
	}
}

export default FundsList