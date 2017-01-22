import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import ajaxFunctions from '../common/ajax-functions';
import SignIn from './sign-in.jsx';
import SignOut from './sign-out.jsx';

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      user: undefined
    }

    this._AuthenticateTwitter = this._AuthenticateTwitter.bind(this);
  }

  _AuthenticateTwitter(){
    window.location = '/auth/twitter'
  }

  _DeauthenticateTwitter(){
    window.location = '/logout';
  }

  _GetUserData(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/user/:id';
    var auth = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      var userObject = JSON.parse(data);

      auth.setState({user: userObject});
    }));
  }

  componentWillMount() {
    this._GetUserData();
  }

  render(){
    let signIn;
    let userProfile;
    let addBook;
    let allBooks;
    let myBooks;
    let trades;

    if(!this.state.user){
      signIn = <SignIn AuthenticateTwitter={this._AuthenticateTwitter}/>;
    } else{
      userProfile = (
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.user.twitter.displayName} <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><Link to="/profile">Profile</Link></li>
            <li role="separator" className="divider"></li>
            <li className="text-center"><SignOut DeauthenticateTwitter={this._DeauthenticateTwitter} /></li>
            </ul>
          </li>);
      allBooks = <li><Link to="/all-books">All Books</Link></li>;
      addBook = <li><Link to="/add-book">Add Book</Link></li>;
      myBooks = <li><Link to="/my-books">My Books</Link></li>;
      trades = <li><Link to="/trades">Trades</Link></li>
    }

    return(
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#voting-app-navbar" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">BookSwap <i className="fa fa-book" aria-hidden="true"></i></Link>
            </div>
            <div className="collapse navbar-collapse" id="voting-app-navbar">
              <ul className="nav navbar-nav navbar-right">
                {allBooks}
                {addBook}
                {myBooks}
                {trades}
                {signIn||userProfile}
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}