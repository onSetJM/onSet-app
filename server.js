var express = require('express');
var app = express();
var mysql = require('mysql');
var jwt = require('express-jwt');
var bodyParser = require("body-parser");

var authenticate = jwt({ secret: 'OXT7scbPPikaP_mjFyutSPR2RcGr1GZ8Ew-6F_x4RLLLRwQCbFIX9Ou58CLtas9H',
  audience: 'onset.auth0.com'})
  
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', 
  password : '',
  database: 'onset'
});

var onSetAPI = require('./src/js/api/api')(connection);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ type: 'application/*+json' }));
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
    console.log(req.body);
    onSetAPI.createUser(
      {
      username: req.body.username,
      email: req.body.email,
      nickname: req.body.nickname,
      profilepic: req.body.profilepic,
      typeOfLogin: req.body.typeOfLogin
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

app.post('/createartistprofile', function(req, res){
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
    console.log(req.body + "This is req.body");
    onSetAPI.createReview(
      {
       text: req.body.text,
       score: req.body.score,
       userId: req.body.userId,
       profileId: req.body.profileId
       }
    ,function(err, review) {
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

app.post('/profile', function(req, res){
    console.log(req.body.username);
    onSetAPI.getSingleProfile(req.body.username
    , function(err, profile) {
      if(err){
        console.log(err);
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        //console.log(profile[0]);
        res.send({success:true, profile: profile[0]});
      }
    }
  );
});

app.post('/reviews', function(req, res){
    onSetAPI.getReviewsForProfile({},req.body.profileId
    , function(err, reviews) {
      if(err){
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        console.log(reviews);
        res.send({success:true, reviews: reviews});
      }
    }
  );
});

app.post('/searchresults', function(req, res){
    console.log(req.body);
    onSetAPI.getAllProfiles({},req.body.category, req.body.city, req.body.sortingMethod
    , function(err, profiles) {
      if(err){
        console.log(err);
        res.status(400).send("Whoopsy! Something went wrong!");
      }
      else {
        console.log(profiles);
        res.send({success:true, profiles: profiles});
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