import React from 'react';

import { StickyContainer, Sticky } from 'react-sticky';

import { Grid, Col, Row, Nav, NavItem} from 'react-bootstrap';

import AutoAffix from 'react-overlays/lib/AutoAffix';

import Waypoint from 'react-waypoint';

class StickySectionNavigation extends React.Component
{

	constructor(props) {
		super(props);
		this.state = {
			secondaryNavIsSticky: false,
			currentActiveSection: null,
			sectionWaypoints: [],
		}
	}   

	getStyles() {
		const styles = {
			secondaryNav: {
			},
			stickyHeader: {
				top:this.props.topOffset, 
				color: "#006940",
				fontSize: 26,
				lineHeight: 34,
				fontWeight: 600,
				paddingTop:10,
				paddingBottom:10,
    			borderBottom: '2px solid rgb(254, 190, 16)',
    			background:"#fff",
    			zIndex: 999,
			},
			navItemLink: {
    			color: '#097984',
			},
			sectionPositionIndicator: {
				float:"left", 
				width:0, 
				height:0, 
				transform: 'translateY(-100px)',
			}
		};
		return styles;
	}

	handleNavWaypointOnPositionChange = ({ previousPosition, currentPosition }) => {
		this.setState({
			secondaryNavIsSticky: currentPosition === 'above'
		});
	};

	handleSectionWaypointChange = (sectionIndex, currentPosition) => {

		var sectionWaypoints = this.state.sectionWaypoints;

		sectionWaypoints[sectionIndex] = currentPosition;

		var activeIndex = 0;
		for(var i = 0; i < sectionWaypoints.length; i++) {
			if(sectionWaypoints[i] === "inside") {
				activeIndex = i + 1;
				break;
			}
		}
		this.setState({
			currentActiveSection: activeIndex,
			sectionWaypoints: sectionWaypoints,
		});
	};

	render() {

		const styles = this.getStyles();
		const that = this;

		return(
			<div>

				<Grid className="mainPageContentGrid">
					<Row>


						<Col xs={12}  md={9}>


							<div>

								{this.props.data.map(function(section, i) {
									return(

										<StickyContainer key={i}>
											<Sticky topOffset={-75} bottomOffset={0}>
												{
													({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
														return (
															<div style={{ ...style, ...styles.stickyHeader}}>
																<h2 style={{ padding: '0 15px', margin: 0 }} >
																	<span >{section.title}</span>
																</h2>
															</div>
														)
													}
												}
											</Sticky>


											<Waypoint onPositionChange={({ previousPosition, currentPosition }) => { 
													that.handleSectionWaypointChange(i, currentPosition); 
												}} 
												topOffset={that.props.topOffset} />
											<div>
												<div id={section.id} style={styles.sectionPositionIndicator} />
												{section.component}
											</div>
										</StickyContainer>
									)
								})}
							</div>

						</Col>

						<Col xs={12}  md={3} >
							<AutoAffix 
				                viewportOffsetTop={this.props.topOffset + 15}>
								<Nav bsStyle="pills" stacked activeKey={this.state.currentActiveSection} style={styles.secondaryNav} className="stickySecondaryNav">
									{this.props.data.map(function(section, i) {
										return(
											<NavItem  key={i} eventKey={i + 1} href={"#" + section.id} >{section.title}</NavItem>
										)
									})}
								</Nav>
							</AutoAffix>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}


export default StickySectionNavigation;