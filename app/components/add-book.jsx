import React from 'react';
import {browserHistory} from 'react-router';
import ajaxFunctions from '../common/ajax-functions';

export default class AddBook extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {name: undefined};

    this._changeName = this._changeName.bind(this);
    this._addBook = this._addBook.bind(this);
  }


  _addBook(e){
    e.preventDefault();
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/add-book';
    var newBook = this.state;

    ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      let addBookHelper = document.getElementById("addBookHelper");
      let bookData = JSON.parse(data);

      if(bookData.error===undefined){
        document.getElementById("addBookGroup").classList.remove("has-error");
        addBookHelper.style.visibility = "hidden";
        browserHistory.push('/my-books');
      } else{
        document.getElementById("addBookGroup").classList.add("has-error");
        addBookHelper.style.visibility = "visible";
        addBookHelper.innerText = bookData.error;
      }
    }, newBook);
  }

  _changeName(){
    this.setState({
      name: this._bookName.value
    });
  }

  render(){
    return(
      <div className="container book-container">
        <div className="jumbotron book-jumbo">
          <h1 className="add-book-title">Add your book</h1>
            <form method="post" onSubmit={this._addBook}>
              <div className="form-group" id="addBookGroup">
                <label className="control-label" htmlFor="bookName">Name of Book</label>
                <input type="text" ref={v => this._bookName = v} onChange={this._changeName} className="form-control" id="bookName" name="bookName" aria-describedby="addBookHelper"/>
                <span className="help-block" id="addBookHelper"></span>
              </div>
              <button className="btn btn-primary" type="submit">Add Book</button>
            </form>
        </div>
      </div>

    );
  }
}