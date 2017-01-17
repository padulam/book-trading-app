import React from 'react';
import {render} from 'react-dom';
import Home from './components/home.jsx';
import Layout from './components/layout.jsx';
import ajaxFunctions from './common/ajax-functions';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';

const app = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

render(app, document.getElementById('bookSwapApp'));