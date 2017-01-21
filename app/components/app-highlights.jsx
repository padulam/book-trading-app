import React from 'react';

const AppHighlights = () => {
  return(
    <div className="container app-highlights">
      <div className="col-lg-4">
        <i className="fa fa-sign-in fa-4x" aria-hidden="true"></i>
        <h2>Create an Account</h2>
        <p>Use your Twitter login information to create an account and start using our service.</p>
      </div>
      <div className="col-lg-4">
        <i className="fa fa-building fa-4x" aria-hidden="true"></i>
        <h2>Add Books</h2>
        <p>You can easily use our service to add your books to the site's list of available titles.</p>
      </div>
      <div className="col-lg-4">
        <i className="fa fa-share fa-4x" aria-hidden="true"></i>
        <h2>Trade</h2>
        <p>Once you're done adding your books, search the site for books to request from your friends.</p>
      </div>
    </div>
  );
}

export default AppHighlights;