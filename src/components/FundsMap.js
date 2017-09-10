import React from 'react';

import ReactDOM from 'react-dom';

import {Raphael,Paper, Set, Circle,Ellipse,Image,Rect,Text,Path,Line} from 'react-raphael';

var mapData = require('../ext/us-map-svg.json');

class FundsMap extends React.Component {

	render() {

		const stateSettings = {
			"fill": "#d3d3d3",
			"stroke": "#fff",
			"stroke-opacity": "1",
			"stroke-linejoin": "round",
			"stroke-miterlimit": "4",
			"stroke-width": "0.75",
			"stroke-dasharray": "none"
		};

		return(
			<Paper width={"100%"} height={600}>
				<Set>
					{Object.keys(mapData).map(function(stateCode, i) {
						var stateData = mapData[stateCode];
						return(
							<Path d={[stateData]}  attr={stateSettings} key={i} />
						);
					})}
				</Set>
			</Paper>
		);
	}
}

export default FundsMap