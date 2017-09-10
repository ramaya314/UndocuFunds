import React from 'react';

import ReactDOM from 'react-dom';

import {Raphael,Paper, Set, Circle,Ellipse,Image,Rect,Text,Path,Line} from 'react-raphael';

var mapData = require('../ext/us-map-svg.json');


class State extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			class: 0
		}
	}   

	mouseOver = () => {
		this.setState({
			class: 1,
		});
	};

	mouseOut = () => {
		this.setState({
			class: 0,
		});
	};


	render() {

		var isPopulatedState = this.props.stateCode && this.props.stateCode.length > 0 && (
			this.props.stateCode.toUpperCase() == "VA" ||
			this.props.stateCode.toUpperCase() == "CA" ||
			this.props.stateCode.toUpperCase() == "IL"
		);

		const stateSettings = {
			"fill": this.props.selected ? "#f00" : this.state.class == 0 ? isPopulatedState ? "#42a1f4" : "#d3d3d3" : "#00f",
			"stroke": "#fff",
			"stroke-opacity": "1",
			"stroke-linejoin": "round",
			"stroke-miterlimit": "4",
			"stroke-width": "0.75",
			"stroke-dasharray": "none"
		};

		return(
			<Path d={[this.props.data]} attr={stateSettings} mouseover={this.mouseOver} mouseout={this.mouseOut} mousedown={this.props.onClick} />
		)
	}
}

class FundsMap extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			selectedState: ''
		}
	}   

	onStateClick = (state) => {
		this.setState({
			selectedState: state,
		});
		this.props.onStateClick(state);
	};


	render() {

		let that = this;
		return(
			<Paper width={"100%"} height={600}>
				<Set>
					{Object.keys(mapData).map(function(stateCode, i) {
						var stateData = mapData[stateCode];
						return(
							<State data={stateData} stateCode={stateCode} key={i} onClick={() => { that.onStateClick(stateCode); }} selected={that.state.selectedState == stateCode} />
						);
					})}
				</Set>
			</Paper>
		);
	}
}

export default FundsMap