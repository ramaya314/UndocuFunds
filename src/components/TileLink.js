import React from 'react';

import Paper from 'material-ui/Paper';


class TileLink extends React.Component
{

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isLoading : true,
		}

	}   

	getStyles() {
		const styles = {
			container : {
				background: 'rgb(0, 105, 64)',
				height: 100,
				width: '100%',
				color: '#eff0e7',
				fontSize: '26px',
				fontWeight: '600',
				marginBottom: 10, 
			    verticalAlign: 'bottom',
			    padding: '8px 22% 9px 15px',
			    display: 'table',
			    textDecoration: 'none',
			    backgroundImage: 'url(' + this.props.background + ')',
				backgroundPosition: 'right bottom',
				backgroundRepeat: 'no-repeat',
			},
			content : {
				display: 'table-cell',
				verticalAlign: 'bottom',
			},
		};
		return styles;
	}

	render() {

		const styles = this.getStyles();

		return(
			<Paper zDepth={3} >
				<a href={this.props.link} style={styles.container} className="tileLinkNavigationItem" >
					<span style={styles.content}>{this.props.linkTitle}</span>
				</a>
			</Paper>
		);
	}
}


export default TileLink;