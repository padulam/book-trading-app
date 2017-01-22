import React from 'react';

const AllBooksRow = (props) => {
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.authors.join(" \n")}</td>
      <td>{props.description}</td>
      <td>{props.availability}</td>
    </tr>
    );
};

export default AllBooksRow;