var passport = require('passport');
var express = require("express"); 
var app = express();
// This is the file we created in step 2.
// This will configure Passport to use Auth0
var strategy = require('./setup-passport');

// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: 'YBoK61DZHqYacFX2XLTg1jpJnu50B7dH9cIRC_3EO51tTtiwM6YX9W6baU6zGmr6', resave: false,  saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
  });
app.get('/user', function (req, res) {
  res.render('user', {
    user: req.user
  });
});