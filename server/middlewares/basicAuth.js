var _ = require('lodash');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer');
var debug = require('debug')('app:basicAuth');
var config = require('../config');
var lang = require('../common/lang');
var securityService = require('../services/SecurityService');
var userService = require('../services/UserService');

var AuthError = lang.createError('AuthError');

// The definitions for authentication middleware.
var AUTH_ERROR_MESSAGE = {
  'TOKEN_EMPTY': 'PARSED TOKEN IS EMPTY!',
  'TOKEN_EXPIRED': 'TOKEN HAS BEEN EXPIRED',
  'USER_UNKNOWN': 'UNKNOWN USER',
  'NOT_MATCHED_ROLES': 'USE NOT BELONG TO REQUIRED ROLES',
  'ACCESS_DENY': 'you don\'t have permisson.'
};

// The token verification handler.
function tokenParse(req, access_token, done) {
  securityService
    .parseAccessToken(access_token)
    .then(function (token) {
      debug('parsed token: ', token);
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
        return done(null, user, {
          scope: 'all'
        });
      }
    })
    .catch(function (err) {
      // console.log('err', err)
      if (_.isString(err)) {
        err = new Error(err);
      }
      var params = [err];
      // capture AuthError
      var errKey = err.code;
      var message = AUTH_ERROR_MESSAGE[errKey] || '';
      switch (errKey) {
        case 'TOKEN_EMPTY':
        case 'TOKEN_EXPIRED':
        case 'USER_UNKNOWN':
          params = [null, false, message];
          break;
        default:
          params = [null, false, message];
      }
      return done.apply(null, params);
    })
    .done();
}
// using auth token strategy.
// add token strategy to passort fremework.
debug('loading passport strategy as `BearerStrategy...`');
passport.use(
  new BearerStrategy({
    passReqToCallback: true
  }, tokenParse)
);

module.exports = {

  /**
   * Parse user token (expired,empty)
   * @example
   * show: function (req, res, next) {
   *    var user = req.authInfo;
   *   // parse successfully.
   *    if(user) {
   *       // do some thing.
   *    }
   * }
   * 1. attach access_token='token_value' to url parameter.
   * 2. attach 'access_token: token_value' in the body payload for post request.
   * 3. using headers: {Authorization:'Bearer token_value'}
   */
  authToken: function () {
    debug('initial basicAuth.authToken...');
    return passport.authenticate('bearer', {
      session: false,
      // Set properity 'autoInfo' to request,
      // we can use req.authInfo to access authenticated user.
      assignProperty: 'authInfo'
    });
  },
  /**
   * Note: the security midleware must be used after .authToken()
   * @param  {Array} roles the user must be in specificed roles.
   */
  security: function (roles) {

    debug('initial basicAuth.security authentication....', roles);

    if (roles && _.isString(roles)) {
      roles = [roles];
    }
    return function (req, res, next) {
      debug('required roles:', roles);

      var user = req.authInfo;
      if (!user) {
        next(new AuthError('USER_UNKNOWN'));
      } else {
        user.isCustomerInRoles(roles).then(function (user) {
          if (user) {
            next();
          } else {
            next(new AuthError('NOT_MATCHED_ROLES'));
          }
        });
      }
    };
  }
};
