var config = require('../config');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var securityService = require('./securityService');

var strategy = new BearerStrategy(function (access_token, done) {
  //
  securityService.checkAccessTokenStatus(access_token, function (err, token) {

    // has error
    if (err) {
      return done(err);
    }
    // invalid_token
    if (!token) return done(null, false);

    // token_expired
    if (Math.round((Date.now() - token.created) / 1000) > config.security.tokenLife) {
      // if we need remove this access_token if we use radis cache.
      return done(null, false, 'token has been expired');
    }
    // find user data.
    userService.findUser(token.userId).then(function (user) {
      done(null, user, {
        scope: '*'
      });
    }, function (err) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }

    });

  });

});

//
passport.use(strategy);
