var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'onset.auth0.com',
    clientID:     'u62PeQq50xQ4RgaJr291OGnUwdgrc6cA',
    clientSecret: 'YBoK61DZHqYacFX2XLTg1jpJnu50B7dH9cIRC_3EO51tTtiwM6YX9W6baU6zGmr6',
    callbackURL:  '/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;