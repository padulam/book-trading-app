import React from 'react';
import {render} from 'react-dom';
import Home from './components/home.jsx';
import Layout from './components/layout.jsx';
import AllBooks from './components/all-books.jsx';
import AddBook from './components/add-book.jsx';
import MyBooks from './components/my-books.jsx';
import Trades from './components/trades.jsx';
import Profile from './components/profile.jsx';
import ajaxFunctions from './common/ajax-functions';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';

const app = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="/all-books" component={AllBooks}/>
      <Route path="/add-book" component={AddBook}/>
      <Route path="/my-books" component={MyBooks}/>
      <Route path="/trades" component={Trades} />
      <Route path="/profile" component={Profile}/>
    </Route>
  </Router>
);

render(app, document.getElementById('bookSwapApp'));