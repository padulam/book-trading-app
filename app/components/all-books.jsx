import React from 'react';
import AllBooksTable from './all-books-table.jsx';
import AllBooksRow from './all-books-row.jsx';
import RequestBook from './request-book.jsx';
import ajaxFunctions from '../common/ajax-functions';

export default class AllBooks extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {allBooks: [], user: undefined};

    this._initiateTrade = this._initiateTrade.bind(this);
  }

  componentDidMount() {
    this._fetchAllBooks();
    this._fetchUserData();
  }

  _fetchUserData(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/user/:id';
    var self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let userObject = JSON.parse(data);

      self.setState({user: userObject, allBooks: self.state.allBooks});
    }));
  }

  _fetchAllBooks(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/get-all-books';
    var self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      self.setState({allBooks: JSON.parse(data), user: self.state.user});
    }));
  }

  _initiateTrade(bookId){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/initiate-trade/' + bookId;
    var self = this;

    
    ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      console.log(JSON.parse(data));
      self.setState({allBooks: JSON.parse(data), user: self.state.user});
    });
  }

  _getAllBooks(){
    let userName = this.state.user.twitter.username;

    return this.state.allBooks.map((book) => {
      let availability;

      if(userName === book.owner){
        availability = "You are the owner of this book";
      }else if(book.temporaryOwner){
        availability = "Unavailable";
      }else if(book.trades.length){
        let i = 0;
        let tradeRequested = false;
        do{
          if(book.trades[i].requestor === userName && book.trades[i].status === "Pending"){
            tradeRequested = true;
          }

          i++
        }while(i<book.trades.length&&tradeRequested===false);
        
        if(tradeRequested){
          availability = "You already requested this book";
        } else{
          availability = <RequestBook book={book} initiateTrade={this._initiateTrade}/>;
        }
      } else{
        availability = <RequestBook book={book} initiateTrade={this._initiateTrade}/>;
      }

      return <AllBooksRow
                id={book._id}
                name={book.name}
                authors={book.authors}
                description={book.description}
                availability={availability}
                key={book._id}/>;
    });
  }

  render(){
    let allBooksDisplay;

    if(this.state.user){
      let allBooks = this._getAllBooks();
      
      if(allBooks.length === 0){
        allBooksDisplay = <p className="text-center">There are no books available</p>;
      }else{
        allBooksDisplay = <AllBooksTable allBooks={allBooks}/>;
      }
    }

    return(
      <div className="container book-container">
        <div className="jumbotron books-jumbo">
          <h2 className="text-center">All Books</h2>
          {allBooksDisplay}
        </div>
      </div>
    );
  }
}