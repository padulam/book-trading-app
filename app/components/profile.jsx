import React from 'react';
import ContactInfo from 'contact-info.jsx';
import ajaxFunctions from '../common/ajax-functions';

export default class Profile extends React.Component {
  constructor() {
    super();
  
    this.state = {user: undefined};
  }

  componentWillMount() {
    this._fetchUserData();
  }

  _fetchUserData(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/user/:id';
    var self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let userObject = JSON.parse(data);

      self.setState({user: userObject});
    }));
  }

  _saveContactInfo(newInfo){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/update-profile';
    var self = this;

    ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      let userObject = JSON.parse(data);
      console.log(userObject);
      self.setState({user: userObject});
    }, newInfo);
  }

  render(){
    let user = undefined;
    let userSince = undefined;
    let contactInfo;

    if(this.state.user){
      user = this.state.user.twitter.displayName;
      contactInfo = <ContactInfo user={this.state.user} saveContactInfo={this._saveContactInfo.bind(this)}/>;
    }

    return(
      <div className="container book-container">
        <div className="jumbotron books-jumbo">
          <div className="container">
            <h2 className="text-center">Welcome {user}!</h2>
            {contactInfo}
          </div>
        </div>
      </div>
    );
  }
}