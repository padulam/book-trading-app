import React from 'react';

const SignOut = (props) => {
  return (
    <button onClick={props.DeauthenticateTwitter}  className="btn btn-twitter sign-out navbar-btn">
      <span className="fa fa-twitter"></span> Sign Out
    </button>
  );
};

export default SignOut;