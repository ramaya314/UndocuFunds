import React from 'react';

import {Grid, Col, Row } from 'react-bootstrap';

class FundsTableRow extends React.Component
{
	render() {
		return(
			<Row>
				<Col xs={12}>
	      			{true &&
							<pre>{JSON.stringify(this.props.data, null, 4) }</pre>
					}
				</Col>
			</Row>
		)
	}
}



export default FundsTableRow;