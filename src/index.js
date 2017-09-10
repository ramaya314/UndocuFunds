import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';


import './css/index.css';
import './css/font-awesome.min.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
