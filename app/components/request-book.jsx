import React from 'react'

const RequestBook = (props) => {
  const _handleClick = () => {
    props.initiateTrade(props.book._id);
  };

  return <button className="btn btn-primary" onClick={_handleClick}>Request Book</button>;
};

export default RequestBook;