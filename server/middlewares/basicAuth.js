var _ = require('lodash');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer');
var config = require('../config');
var securityService = require('../services/SecurityService');
var userService = require('../services/UserService');

module.exports = {

  security: function (roles) {

    if (roles && _.isString(roles)) {
      roles = [roles];
    }

    // using auth token strategy.
    var strategy = new BearerStrategy({
      passReqToCallback: true
    }, function (req, access_token, done) {
      // validation user token..
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
          if (!user) {
            return done(null, false, {
              message: 'Unknown user'
            });
          } else {

            userService.isCustomerInRoles(user, roles).then(function (user) {
              console.log('sss', user)


              return done(null, user, {
                scope: 'all'
              });


            }, function (err) {
              if (err) {
                return done(err);
              }
            });
          }

        }, function (err) {
          if (err) {
            return done(err);
          }
        });

      });

    });

    // add token strategy to passort fremework.
    passport.use(strategy);

    return passport.authenticate('bearer', {
      session: false,
      assignProperty: 'authInfo'
    });

  }
};
