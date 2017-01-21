import React from 'react';

const MyBook = (props) => {
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.authors.join(" \n")}</td>
      <td>{props.description}</td>
      <td>{props.temporaryOwner}</td>
      <td>{props.trades}</td>
    </tr>
  );
};

export default MyBook;