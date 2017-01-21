import React from 'react';
import AppHighlights from './app-highlights.jsx';
import LandingJumbotron from './landing-jumbotron.jsx';

export default class Home extends React.Component {
  render(){
    return(
      <div>
        <LandingJumbotron />
        <AppHighlights />
      </div>
    );
  }
}