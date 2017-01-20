var Books = require('../../models/books');
var Users = require('../../models/users');
var httpRequest = require('request');

function BookTradingApi(){
  this.updateUserProfile = function(request, response){
    User.findOne({'twitter.id': request.user.twitter.username}, 
      function(err, user){
        if(err) return response.json({error: err});
        
        if(user){
          user.firstName = request.body.firstName;
          user.lastName = request.body.lastName;
          user.address = request.body.address;
          user.city = request.body.city;
          user.state = request.body.state;

          user.save(function(err){
            if(err) response.json({error: err});

            response.json(user);
          });
        }else{
          response.json({error: 'User does not exist!'});
        }
      }
    );
  };

  this.addBook = function(request, response){
    var book = new Books();
    book.name = request.body.name;
    book.authors = request.body.authors;
    book.description = request.body.description;
    book.thumbnailImage = request.body.thumbnailImage;
    book.owner = request.user.twitter.username;
    book.trades = [];
    book.temporaryOwner = undefined;

    book.save(function(err){
      if(err) response.json(err);

      response.json(book);
    });
  }

  this.getBookData = function(request, response){
    var apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + request.params.book + "&key=" + process.env.GOOGLE_BOOK_API_KEY;

    httpRequest(apiUrl, function(httpErr, httpResponse, data){
      if(httpErr) response.json({error: httpErr});

      var bookData = JSON.parse(data);
      if(bookData.totalItems > 0){
        var firstMatch = bookData.items[0].volumeInfo;
        
        var bookResponse = {
          name: firdstMatch.title,
          authors: firstMatch.authors,
          description: firstMatch.description,
          thumbnailImage: firstMatch.imageLinks.thumbnail
        };

        response.json(bookResponse);
      } else{
        response.json({error: 'There is no book with that title.'});
      }
    });
  };

  this.getAllBooks = function(request, response){
    Books.find(function(err, books){
      if(err) response.json({error: err});

      response.json(books);
    });
  };

  this.initiateTrade = function(request, response){
    Books.findOne({_id: request.params.book_id}, function(err, book){
      if(err) response.json({error: err});

      book.trades.push({
        requestor: request.user.twitter.username,
        status: "Pending",
        dateRequested: Date()
      });

      //Stores user's trade request
      User.findOne({'twitter.id': request.user.twitter.username}, 
        function(err, user){
          if(err) return response.json({error: err});
          
          if(user){
            var sameBooks = user.myTrades.filter(function(myTrade){
              return myTrade === book._id;
            });

            if(sameBooks.length>0){
              user.myTrades.push(book._id);
              user.save(function(err){
                if(err) response.json({error: err});

                response.json(user);
              });
            }
          }else{
            response.json({error: 'User does not exist!'});
          }
        }
      );

      book.save(function(err){
        if(err) response.json({error: err});

        response.json(book);
      });
    });
  };

  this.getTradeRequests = function(request, response){
    User.findOne({'twitter.id': request.user.twitter.username}, 
        function(err, user){
          if(err) return response.json({error: err});
          
          if(user){
            var myTrades = [];

            for(var i = 0; i<user.trades.length;i++){
              Books.findOne({'_id': user.trades[i]}, function(err, book){
                if(err) response.json({error: err});

                var temp = book.trades.filter(function(trade){
                  return trade.requestor === user.twitter.username;
                });

                myTrades.concat({
                  id: book[i]._id,
                  trades: temp
                });
              });
            }
            
            response.json(myTrades);
          }else{
            response.json({error: 'User does not exist!'});
          }
        }
      );
  };

  this.getTradeOffers = function(request, response){
    Books.find({owner: request.user.twitter.username}, function(err, books){
      if(err) response.json({error: err});

      var trades = [];

      for(var i=0; i<books.length; i++){
        if(book[i].trades.length>0){
          trades.concat({
            id: book[i]._id,
            trades: book[i].trades
          });
        }
      }
      
      if(trades.length>0){
        response.json(trades);
      } else{
        response.json({message: 'You have no trades at this time!'});
      }
    });
  };

  this.addressTradeOffer = function(request, response){
    Books.findOne({_id: request.body.book_id}, function(err, book){
      var i = 0;
      var foundTrade = false;

      do{
        if(book.trades[i].requestor === request.user.twitter.username && book.trades[i].status === "Pending"){
          if(request.body.accepted){
            book.trade[i].status = "Accepted";
            book.temporaryOwner = request.user.twitter.username;
          } else{
            book.trade[i].status = "Declined";
          }
          
          foundTrade = true;
        }

        i++;
      } while(pendTrade === undefined && i<book.trade.length);

      book.save(function(err){
        if(err) response.json({error: err});

        response.json(book);
      });
    });
  }
}

module.exports = BookTradingApi;