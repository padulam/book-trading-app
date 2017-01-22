import React from 'react';
import {browserHistory} from 'react-router';

const ViewTrades = (props) => {
  const _handleClick = () => {
    browserHistory.push('/trades');
  }

  return(
    <button onClick={_handleClick} className="btn btn-primary">View</button>
  );
};

export default ViewTrades;