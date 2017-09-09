import React from 'react';

import {
  Route
} from 'react-router-dom';


import HomePage from './pages/HomePage';


import ScrollToTopRoute from './components/ScrollToTopRoute'

const AppRoutes = (
  <div>

    <ScrollToTopRoute exact path="/" component={HomePage}>
    </ScrollToTopRoute>

  </div>
);

export default AppRoutes;