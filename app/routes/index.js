module.exports = function(app, passport){
  var path = require('path');
  var dir = process.cwd();
  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();
  var BookTradingApi = require('../controllers/api/book-trading-api');
  var bookTradingApi = new BookTradingApi();

  app.get('/', function(request, response){
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

  app.post('/update-profile', jsonParser, bookTradingApi.updateUserProfile);

  app.post('/add-book', jsonParser, bookTradingApi.addBook);

  app.get('/get-book-data/:book', bookTradingApi.getBookData);

  app.get('/get-all-books', bookTradingApi.getAllBooks);
};