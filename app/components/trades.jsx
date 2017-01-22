import React from 'react';
import ajaxFunctions from '../common/ajax-functions';

export default class Trades extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {tradeOffers: [], tradeRequests: []};

    this._addressTradeOffer = this._addressTradeOffer.bind(this);
  }

  componentDidMount() {
    this._fetchTradeOffers();
  }

  _fetchTradeOffers(){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/get-all-trade-offers';
    var self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      self.setState({tradeOffers: JSON.parse(data)});
    }));
  }

  _addressTradeOffer(bookId, requestor, accepted){
    var appUrl = window.location.origin;
    var apiUrl = appUrl + '/api/address-trade-offer';
    var self = this;
    var tradeData = {bookId: bookId, requestor: requestor, accepted: accepted};

    console.log(tradeData);

    ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      self.setState({tradeOffers: JSON.parse(data)});
    }, tradeData);
  }

  _getTradeOffers(){
    let i = 0;
    return this.state.tradeOffers.map((offer) => {
      i++;
      return <TradeOffer 
                id = {offer._id}
                name = {offer.name}
                authors = {offer.authors}
                description = {offer.description}
                requestor = {offer.requestor}
                status = {offer.status}
                addressTradeOffer = {this._addressTradeOffer}
                key={i}/>
    });
  }

  render(){
    let tradeOffersDisplay;

    if(this.state.tradeOffers.length){
      let offers = this._getTradeOffers();
      tradeOffersDisplay = <TradeOffersTable offers={offers} />;
    }else{
      tradeOffersDisplay = <p className="text-center">You have no trade offers</p>;
    }

    return(
      <div className="container book-container">
        <div className="jumbotron books-jumbo">
          <h2 className="text-center">Trade Requests</h2>
          {tradeOffersDisplay}
        </div>
      </div>
    )
  }
}

const TradeOffersTable = (props) => {
  return(
    <table className="table table-hover table-bordered books-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Author(s)</th>
          <th>Description</th>
          <th>Requestor</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.offers}
      </tbody>
    </table>
  );
};

const TradeOffer = (props) => {
  let acceptDecline;
  
  if(props.status==="Pending"){
    acceptDecline = <td><span id="acceptDecline"><AcceptTrade bookData={props} addressTradeOffer={props.addressTradeOffer}/> <DeclineTrade addressTradeOffer={props.addressTradeOffer} bookData={props}/></span></td>;
  } else{
    acceptDecline = <td>N/A</td>;
  }

  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.authors.join(" \n")}</td>
      <td>{props.description}</td>
      <td>{props.requestor}</td>
      <td>{props.status}</td>
      {acceptDecline}
    </tr>
  );
};

const AcceptTrade = (props) => {
  const _handleClick = () => {
    props.addressTradeOffer(props.bookData.id, props.bookData.requestor, true);
  }

  return(
    <button onClick={_handleClick} className="btn btn-success"><i className="fa fa-thumbs-up" aria-hidden="true"><span className="sr-only">Accept</span></i></button>
  );
};

const DeclineTrade = (props) => {
  const _handleClick = () => {
    props.addressTradeOffer(props.bookData.id, props.bookData.requestor, false);
  }

  return(
    <button onClick={_handleClick} className="btn btn-danger"><i className="fa fa-thumbs-down" aria-hidden="true"></i><span className="sr-only">Decline</span></button>
  );
}