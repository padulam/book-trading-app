import React from 'react';

const MyBooksTable = (props) => {
  return(
    <table className="table table-hover table-bordered my-books-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Description</th>
          <th>Temporary Owner</th>
          <th>Trade Offers</th>
        </tr>
      </thead>
      <tbody>
        {props.myBooks}
      </tbody>
    </table>
  );
};

export default MyBooksTable;