module.exports = function(app, passport){
  var path = require('path');
  var dir = process.cwd();
  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();
  var BookTradingApi = require('../controllers/api/book-trading-api');
  var bookTradingApi = new BookTradingApi();

  function loggedIn(request, response, next){
    if(request.user!==undefined){
      return next();
    } else{
      response.redirect('/')
    }
  }

  app.get('/', function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.get('/add-book', loggedIn, function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.get('/all-books', loggedIn, function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.get('/my-books', loggedIn, function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.get('/profile', loggedIn, function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.route('/logout')
    .get(function(request, response){
      request.logout();
      response.redirect('/');
    });

  app.route('/api/user/:id')
    .get(function(request, response){
      response.json(request.user||null);
    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/',
      failureFlash: true
    }));

  app.post('/api/update-profile', loggedIn, jsonParser, bookTradingApi.updateUserProfile);

  app.post('/api/add-book', loggedIn, jsonParser, bookTradingApi.addBook);

  app.get('/api/get-all-books', loggedIn, bookTradingApi.getAllBooks);

  app.get('/api/get-all-trade-offers', loggedIn, bookTradingApi.getTradeOffers);

  app.get('/api/get-all-trade-requests', loggedIn, bookTradingApi.getTradeRequests);

  app.post('/api/initiate-trade/:book_id', loggedIn, bookTradingApi.initiateTrade);

  app.post('/api/address-trade-offer', loggedIn, jsonParser, bookTradingApi.addressTradeOffer);

  app.get('/api/get-my-books', loggedIn, bookTradingApi.getMyBooks);
};