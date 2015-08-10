var _ = require('lodash');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer');
var config = require('../config');
var lang = require('../common/lang');
var securityService = require('../services/SecurityService');
var userService = require('../services/UserService');

var AuthError = lang.createError('AuthError');

var AUTH_ERROR_MESSAGE = {
  'TOKEN_EMPTY': 'PARSED TOKEN IS EMPTY!',
  'TOKEN_EXPIRED': 'TOKEN HAS BEEN EXPIRED',
  'USER_UNKNOWN': 'UNKNOWN USER',
  'NOT_MATCHED_ROLES': 'USE NOT BELONG TO REQUIRED ROLES'
};
module.exports = {

  /**
   * @exmaples:
   * 1. attach access_token='token_value' to url parameter.
   * 2. attach 'access_token: token_value' in the body payload for post request.
   * 3. using headers: {Authorization:'Bearer token_value'}
   * @param  {Array} roles the user must be in specificed roles.
   */
  security: function (roles) {

    if (roles && _.isString(roles)) {
      roles = [roles];
    }
    // The token verification handler.
    var tokenVerify = function (req, access_token, done) {
      // validation user token..
      securityService
        .parseAccessToken(access_token)
        .then(function (token) {
          if (!token) {
            throw new AuthError('TOKEN_EMPTY');
          }
          // token_expired
          if (Math.round((Date.now() - token.created) / 1000) > config.security.tokenLife) {
            // if we need remove this access_token if we use radis cache.
            throw new AuthError('TOKEN_EXPIRED');
          }
          // return user if found.
          return userService.findUserById(token.userId);
        })
        .then(function (user) {
          if (!user) {
            throw new AuthError('USER_UNKNOWN');
          } else {
            // check if user role is in required role groups
            return userService.isCustomerInRoles(user, roles);
          }
        })
        .then(function (userRole) {
          if (userRole) {
            return done(null, userRole, {
              scope: 'all'
            });
          } else {
            throw new AuthError('NOT_MATCHED_ROLES');
          }
        })
        .catch(function (err) {
          // console.log('err', err)
          if (_.isString(err)) {
            err = new Error(err);
          }
          var params = [err];
          // capture AuthError
          if (err instanceof AuthError) {
            var errKey = err.code;
            var message = AUTH_ERROR_MESSAGE[errKey] || '';
            switch (errKey) {
              case 'TOKEN_EMPTY':
              case "TOKEN_EXPIRED":
              case "USER_UNKNOWN":
              case "NOT_MATCHED_ROLES":
                params = [null, false, message];
                break;
            }
          }
          return done.apply(null, params);
        })
        .done();
    };
    // using auth token strategy.
    // add token strategy to passort fremework.
    passport.use(
      new BearerStrategy({
        passReqToCallback: true
      }, tokenVerify)
    );
    return passport.authenticate('bearer', {
      session: false,
      // Set properity 'autoInfo' to request,
      // we can use req.authInfo to access authenticated user.
      assignProperty: 'authInfo'
    });
  }
};
