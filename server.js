var express = require('express');
var app = express();
var mysql = require('mysql');
var jwt = require('express-jwt');

var authenticate = jwt({ secret: 'OXT7scbPPikaP_mjFyutSPR2RcGr1GZ8Ew-6F_x4RLLLRwQCbFIX9Ou58CLtas9H',
  audience: 'onset.auth0.com'})
  
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', 
  password : '',
  database: 'onset'
});

var onSetAPI = require('./src/js/api/api')(connection);

app.use(express.static(__dirname + '/public'))
/* insert any app.get or app.post you need here */

/*
This says: for any path NOT served by the middleware above, send the file called index.html instead.
For example, if the client requests http://server/step-2 the server will send the file index.html, which will start the same React app.
This will enable us to do url-based routing on the front-end.
*/
app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post('/login', function(req, res){
    onSetAPI.createUser(
      {
      username: req.body.rif,
      email: req.body.rif,
      nickname: req.body.rif,
      profilepic: req.body.rof,
      city: req.body.rif,
      typeOfLogin: "Instagram"
    }
    , function(err, user) {
      if(err){
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        res.send({success:true, user: user});
      }
    }
  );
});

app.post('/createProfile', function(req, res){
    onSetAPI.createProfile(
      {
       userId: req.body.userId,
       type: req.body.type,
       data: req.body.data,
       city: req.body.city,
       category: req.body.category
     }
    , function(err, profile) {
      if(err){
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        res.send({success:true, profile: profile});
      }
    }
  );
});

app.post('/createareview', function(req, res){
    onSetAPI.createReview(
      {
       text: req.body.reviewObj.text,
       score: req.body.reviewObj.score,
       userId: req.body.reviewObj.userId,
       profileId: req.body.reviewObj.userId
       }
    , function(err, review) {
      if(err){
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        res.send({success:true, review: review});
      }
    }
  );
});

app.post('/searchprofiles', function(req, res){
    onSetAPI.getAllProfiles({},req.body.category, req.body.city, req.body.createdAt
    , function(err, profiles) {
      if(err){
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        res.send({success:true, profiles: profiles});
      }
    }
  );
});

app.post('/displayreviews', function(req, res){
    onSetAPI.getReviewsForProfile({},req.body.profileId
    , function(err, reviews) {
      if(err){
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        res.send({success:true, reviews: reviews});
      }
    }
  );
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server started');
});

// app.get('/login',
//   jwt({secret: }),
//   function(req, res) {
//     if (!req.user.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   });