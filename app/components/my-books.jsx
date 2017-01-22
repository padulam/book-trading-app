import React from 'react';
import MyBooksTable from './my-books-table.jsx';
import MyBook from './my-book.jsx';
import ViewTrades from './view-trades.jsx';
import ajaxFunctions from '../common/ajax-functions';

export default class MyBooks extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {myBooks: []};
  }

  componentDidMount() {
    this._fetchMyBooks();
  }
  
  _fetchMyBooks(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/get-my-books';
    var self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      self.setState({myBooks: JSON.parse(data)});
    }));
  }

  _getMyBooks(){
    return this.state.myBooks.map((myBook) => {
      return <MyBook 
                id = {myBook._id}
                name = {myBook.name}
                authors = {myBook.authors}
                description = {myBook.description}
                temporaryOwner = {myBook.temporaryOwner || "N/A"}
                trades = {myBook.trades.length > 0 ? <ViewTrades /> : "N/A"}
                key = {myBook._id}
              />
    });
  }

  render(){
    let myBooks = this._getMyBooks();
    let myBooksDisplay;

    if(myBooks.length === 0){
      myBooksDisplay = <p className="text-center">You have no stored books</p>;
    }else{
      myBooksDisplay = <MyBooksTable myBooks={myBooks}/>;
    }

    return(
      <div className="container book-container">
        <div className="jumbotron books-jumbo">
          <h2 className="text-center">My Books</h2>
          {myBooksDisplay}
        </div>
      </div>
    );
  }
}