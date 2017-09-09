import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router
} from 'react-router-dom';

import AppRoutes from './AppRoutes';

import injectTapEventPlugin from 'react-tap-event-plugin';

import './css/index.css';
import './css/font-awesome.min.css';

injectTapEventPlugin();

ReactDOM.render(
	<Router onUpdate={() => window.scrollTo(0, 0)}>
		{AppRoutes}
	</Router>,
  document.getElementById('root')
);


