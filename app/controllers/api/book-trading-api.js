var Books = require('../../models/books');
var Users = require('../../models/users');
var httpRequest = require('request');

function BookTradingApi(){
  var self = this;

  this.updateUserProfile = function(request, response){
    Users.findOne({'twitter.username': request.user.twitter.username}, 
      function(err, user){
        if(err) return response.json({error: err});
        
        if(user){
          user.firstName = request.body.firstName;
          user.lastName = request.body.lastName;
          user.address = request.body.address;
          user.city = request.body.city;
          user.state = request.body.state;
          user.zip = request.body.zip;

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
    var apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + request.body.name + "&key=" + process.env.GOOGLE_BOOK_API_KEY;

    httpRequest(apiUrl, function(httpErr, httpResponse, data){
      if(httpErr) response.json({error: httpErr});

      var bookData = JSON.parse(data);
      if(bookData.totalItems > 0){
        var firstMatch = bookData.items[0].volumeInfo;
        
        var bookResponse = {
          name: firstMatch.title,
          authors: firstMatch.authors,
          description: firstMatch.description,
          thumbnailImage: firstMatch.imageLinks !== undefined ? firstMatch.imageLinks.thumbnail : undefined
        };

        var book = new Books();
        book.name = bookResponse.name;
        book.authors = bookResponse.authors;
        book.description = bookResponse.description;
        book.thumbnailImage = bookResponse.thumbnailImage;
        book.owner = request.user.twitter.username;
        book.trades = [];
        book.temporaryOwner = undefined;

        book.save(function(err){
          if(err) response.json(err);

          response.json(book);
        });
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

  this.getMyBooks = function(request, response){
    Books.find({owner: request.user.twitter.username}, function(err, books){
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
      Users.findOne({'twitter.username': request.user.twitter.username}, 
        function(err, user){
          if(err) return response.json({error: err});
          
          if(user){
            var sameBooks = user.myTrades.filter(function(myTrade){
              return myTrade === book._id;
            });

            if(sameBooks.length===0){
              user.myTrades.push(book._id);
            }

            user.save(function(err){
              if(err) response.json({error: err});

              book.save(function(err){
                if(err) response.json({error: err});

                self.getAllBooks(request, response);
              });
            });
          }else{
            response.json({error: 'User does not exist!'});
          }
        }
      );
    });
  };

  this.getTradeRequests = function(request, response){
    Users.findOne({'twitter.id': request.user.twitter.username}, 
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
        if(books[i].trades.length>0){
          for(var j=0; j<books[i].trades.length;j++){
            books[i].trades[j]._id = books[i]._id;
            books[i].trades[j].name = books[i].name;
            books[i].trades[j].authors = books[i].authors;
            books[i].trades[j].description = books[i].description;
            books[i].trades[j].thumbnailImage = books[i].thumbnailImage;
            trades.push(books[i].trades[j]);
          }
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
    Books.findOne({_id: request.body.bookId}, function(err, book){
      var i = 0;
      var foundTrade = false;

      do{
        if(book.trades[i].requestor === request.body.requestor && book.trades[i].status === "Pending"){
          if(request.body.accepted){
            book.trades[i].status = "Accepted";
            book.temporaryOwner = request.body.requestor;
            //Close all other pending trades
            for(var j = 0; j<book.trades.length; j++){
              if (book.trades[j].status === "Pending") book.trades[j].status="Declined";
            }
          } else{
            book.trades[i].status = "Declined";
          }
          
          foundTrade = true;
        }

        i++;
      } while(foundTrade === false && i<book.trades.length);

      book.markModified('trades');      

      book.save(function(err){
        if(err) response.json({error: err});

        self.getTradeOffers(request, response);
      });
    });
  }
}

module.exports = BookTradingApi;