import React from 'react';

const AllBooksTable = (props) => {
  return(
    <table className="table table-hover table-bordered books-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Author(s)</th>
          <th>Description</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        {props.allBooks}
      </tbody>
    </table>
  );
};

export default AllBooksTable;