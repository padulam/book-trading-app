import React from 'react';

const SignIn = (props) => {
  return (
    <li>
      <button onClick={props.AuthenticateTwitter}  className="btn btn-twitter navbar-btn">
        <span className="fa fa-twitter"></span> Sign in with Twitter
      </button>
    </li>
  );
};

export default SignIn;