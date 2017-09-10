import React from 'react';

import {Grid, Col, Row } from 'react-bootstrap';

import Done from 'material-ui/svg-icons/action/done';


class ScholarshipFundsHeader extends React.Component
{

	getStyles() {
		const styles = {
			altRow : {
				backgroundColor: "#eee",
				margin: 0,
			},
			normalRow: {
				margin:0
			}
		}
		return styles;
	}

	render() {
		var styles = this.getStyles();
		return(
			<Row style={(this.props.index %2 == 0 ? styles.normalRow : styles.altRow)}>
				<Col xs={5} sm={this.props.authed ? 5 : 6} md={4} lg={3}  style={{fontWeight: 'bold'}}>
					Name
				</Col>

				<Col xs={5} sm={this.props.authed ? 5 : 6} md={this.props.authed ? 3 : 4} lg={3}  style={{fontWeight: 'bold'}}>
					Legal Status Required
				</Col>

				<Col xsHidden={true} smHidden={true} md={this.props.authed ? 3 : 4} lg={this.props.authed ? 4: 3}  style={{fontWeight: 'bold'}}>
					Deadline
				</Col>

				{!this.props.authed && 
					<Col xsHidden={true} smHidden={true} mdHidden={true} lg={3} style={{fontWeight: 'bold'}}>
						Education Level Required
					</Col>
				}

				{this.props.authed && 
					<Col xs={2}>
					</Col>
				}

			</Row>
		)
	}
}

class LegalFundsHeader extends React.Component
{

	getStyles() {
		const styles = {
			altRow : {
				backgroundColor: "#eee",
				margin: 0,
			},
			normalRow: {
				margin:0
			},
			checkbox: {
				marginBottom: 16,
			},
		}
		return styles;
	}

	render() {
		var styles = this.getStyles();
		return(

			<Row style={(this.props.index %2 == 0 ? styles.normalRow : styles.altRow)}>
				<Col xs={4} style={{fontWeight: 'bold'}}>
					Organization
				</Col>

				<Col xs={this.props.authed ? 3 : 4} style={{fontWeight: 'bold'}}>
					State
				</Col>

				<Col xs={this.props.authed ? 3 : 4} style={{fontWeight: 'bold'}}>
					Filing Fee Included
				</Col>

				{this.props.authed && 
					<Col xs={2}>
					</Col>
				}
			</Row>
		)
	}
}

class HealthFundsHeader extends React.Component
{

	getStyles() {
		const styles = {
			altRow : {
				backgroundColor: "#eee",
				margin: 0,
			},
			normalRow: {
				margin:0
			},
			checkbox: {
				marginBottom: 16,
			},
		}
		return styles;
	}

	render() {
		var styles = this.getStyles();

		return(
			<Row style={(this.props.index %2 == 0 ? styles.normalRow : styles.altRow)}>
				<Col xs={4} style={{fontWeight: 'bold'}}>
					Name
				</Col>

				<Col  xs={2}  style={{fontWeight: 'bold'}}>
					State
				</Col>

				<Col xs={1} sm={1} md={2} style={{fontWeight: 'bold'}}>
					Private
				</Col>

				<Col xs={1} sm={1} md={this.props.authed ? 1 : 2} style={{fontWeight: 'bold'}}>
					Public
				</Col>

				<Col xs={1} sm={1} sm={1} md={this.props.authed ? 1 : 2} style={{fontWeight: 'bold'}}>
					Non-Profit
				</Col>

				{this.props.authed && 
					<Col xs={2}>
					</Col>
				}
			</Row>
		)
	}
}

class FundsTableRow extends React.Component
{
	render() {

		switch(this.props.type) {
			case "scholarships":
				return (<ScholarshipFundsHeader authed={this.props.authed} />);
			case "legalaid":
				return (<LegalFundsHeader authed={this.props.authed} />);
			case "health":
				return (<HealthFundsHeader authed={this.props.authed} />);
		}

	}
}



export default FundsTableRow;