import React from 'react';

class Spacer extends React.Component
{
	render() {
		return(
			<div style={{marginTop: this.props.space}} />
		);
	}
}
export default Spacer;