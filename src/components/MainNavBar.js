import React from 'react';

import Waypoint from 'react-waypoint';

import Dimensions from 'react-dimensions';

import { Navbar, NavItem, NavDropdown, MenuItem, Nav,
			Image, Grid, Row, Col} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import MetaTags from 'react-meta-tags';

class MainNavBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			navbarBrandVisible: false
		}
		console.log(this.props.width);
	}

	getStyles() {

		let smallScreen = this.props.containerWidth < 768;
		var styles = {
			headerBanner: {
				backgroundImage: 'url("' + this.props.backgroundImage + '")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed',
				margin: 0,
				padding: 0,
				border: 0,
				height: smallScreen ? 250 : 500,
				textAlign: 'center',
				position: 'relative'
			},
			navBar: {
				border:0,
			},
			navBarLogoImage: {
				height: 53,
			}
		}

		return styles;
	}

	handleWaypointOnPositionChange = ({ previousPosition, currentPosition }) => {
		this.setState({
			navbarBrandVisible: currentPosition === 'above'
		});
	};


	render() {

    	const styles = this.getStyles();

    	let metaTitle = "UndocuFunds";
    	if(this.props.pageTitle != null && this.props.pageTitle.length > 0)
    		metaTitle += " - " + this.props.pageTitle;

		return(
			<div className="mainNavBarTopContainer">

				<MetaTags>
					<title>{metaTitle}</title>
					{/*<meta id="meta-description" name="description" content="Some description." />*/}
					<meta id="og-title" property="og:title" content={this.props.pageTitle} />
					<meta id="og-image" property="og:image" content={this.props.backgroundImage} />
				</MetaTags>

				<Navbar inverse collapseOnSelect fluid style={styles.navBar} expanded={this.state.navbarExpanded} 
				className={(this.state.navbarBrandVisible || this.props.containerWidth < 768? "mainNavBar" :  "mainNavBarInvisible")}
					>
					<Navbar.Header>
						{this.state.navbarBrandVisible && 
							<Navbar.Brand>
								<a href="/" style={styles.navBarLogoImage} className="headerLogo">
									<Image src="/images/logo.png" responsive />
								</a>
							</Navbar.Brand>
						}
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<LinkContainer to="/login">
								<NavItem eventKey={3} >Login</NavItem>
							</LinkContainer>
							<LinkContainer to="/register">
								<NavItem eventKey={3} >Register</NavItem>
							</LinkContainer>

              				{this.props.authed &&
								<LinkContainer to="/dashboard">
									<NavItem eventKey={3} >Dashboard</NavItem>
								</LinkContainer>
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}


export default Dimensions()(MainNavBar);