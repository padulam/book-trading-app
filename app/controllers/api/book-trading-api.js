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
    if(request.user){
      Books.findOne({_id: request.params.book_id}, function(err, book){
        if(err) response.json({error: err});

        book.trades.push({
          requestor: request.user.twitter.username,
          status: "Pending",
          dateRequests: Date()
        });

        book.save(function(err){
          if(err) response.json({error: err});

          response.json(book);
        });
      });
    } else{
      response.json({error: 'You must be logged in to use this feature'});
    }
  };

  this.getTradeOffers = function(request, response){
    if(request.user){
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
    } else{
      response.json({error: 'You must be logged in to use this feature'});
    }
  };
}

module.exports = BookTradingApi;