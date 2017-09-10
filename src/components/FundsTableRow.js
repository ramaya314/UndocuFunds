import React from 'react';

import {Grid, Col, Row } from 'react-bootstrap';

import Done from 'material-ui/svg-icons/action/done';

import { LinkContainer } from 'react-router-bootstrap';

class ScholarshipFundsTableRow extends React.Component
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
				<Col xs={5} sm={this.props.authed ? 5 : 6} md={4} lg={3}>

					<a href={this.props.data.Url} target="_blank">
						{this.props.data.nameOfTheScholarship}
					</a>
				</Col>

				<Col xs={5} sm={this.props.authed ? 5 : 6} md={this.props.authed ? 3 : 4} lg={3} >
					{this.props.data.statusRequired}
				</Col>

				<Col xsHidden={true} smHidden={true} md={this.props.authed ? 3 : 4} lg={this.props.authed ? 4: 3}>
					{this.props.data.deadline}
				</Col>

				{!this.props.authed && 
					<Col xsHidden={true} smHidden={true} mdHidden={true} lg={3}  >
						{this.props.data.educationLevelRequired}
					</Col>
				}

				{this.props.authed && 
					<Col xs={2}>
						<LinkContainer to="/applyconfirmation">
	          				<button  style={{margin:7}} type="submit" className="btn btn-primary" >Apply</button>
						</LinkContainer>
					</Col>
				}

			</Row>
		)
	}
}

class LegalFundsTableRow extends React.Component
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
				<Col xs={4} >

					<a href={this.props.data.Website} target="_blank">
						{this.props.data.nameOfTheOrganization}
					</a>
				</Col>

				<Col xs={this.props.authed ? 3 : 4} >
					{this.props.data.state}
				</Col>

				<Col xs={this.props.authed ? 3 : 4} >
					{this.props.data.filingFeeIncluded}

				</Col>

				{this.props.authed && 
					<Col xs={2}>
						<LinkContainer to="/applyconfirmation">
	          				<button  style={{margin:7}} type="submit" className="btn btn-primary" >Apply</button>
						</LinkContainer>
					</Col>
				}
			</Row>
		)
	}
}

class HealthFundsTableRow extends React.Component
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
				<Col xs={4} >

					<a href={this.props.data.url} target="_blank">
						{this.props.data.name}
					</a>
				</Col>

				<Col xs={4} >
					{this.props.data.state}
				</Col>

				<Col>
					{this.props.private && 
						<Checkbox
							checkedIcon={<Visibility />}
							label="Private"
							style={styles.checkbox}
						/>
					}
				</Col>

				<Col>
					{this.props.public && 
						<Checkbox
							checkedIcon={<Visibility />}
							label="Public"
							style={styles.checkbox}
						/>
					}
				</Col>

				<Col>
					{this.props.nonprofit == "TRUE" && 
						<Checkbox
							checkedIcon={<Visibility />}
							label="Non-Profit"
							style={styles.checkbox}
						/>
					}
				</Col>

				{this.props.authed && 
					<Col xs={2}>
						<LinkContainer to="/applyconfirmation">
	          				<button  style={{margin:7}} type="submit" className="btn btn-primary" >Apply</button>
						</LinkContainer>
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
				return (<ScholarshipFundsTableRow data={this.props.data} index={this.props.index} authed={this.props.authed} />);
			case "legalaid":
				return (<LegalFundsTableRow data={this.props.data} index={this.props.index} authed={this.props.authed} />);
			case "health":
				return (<HealthFundsTableRow data={this.props.data} index={this.props.index} authed={this.props.authed} />);
		}

	}
}



export default FundsTableRow;