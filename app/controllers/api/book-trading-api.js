var Books = require('../../models/books');
var Users = require('../../models/users');

function BookTradingApi(){
  this.updateUserProfile = function(request, response){
    User.findOne({'twitter.id': request.params.twitter_id}, 
      function(err, user){
        if(err) return response.json({error: err});
        
        if(user){
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

  
}

module.exports = BookTradingApi;