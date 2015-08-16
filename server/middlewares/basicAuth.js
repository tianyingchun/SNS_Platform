var _ = require('lodash');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer');
var debug = require('debug')('app:basicAuth');
var lang = require('../common/lang');
var securityService = require('../services/SecurityService');
var userService = require('../services/UserService');
// The definitions for authentication middleware.
var AUTH_ERROR_MESSAGE = require('../constants/Error').Message();

var AuthError = lang.createError('AuthError', {
  status: 401
});

// The token verification handler.
function tokenParse(req, access_token, done) {
  securityService
    .parseAccessToken(access_token)
    .then(function (token) {
      debug('parsed token: ', token);
      if (!token) {
        throw new AuthError('TOKEN.EMPTY');
      }
      // token_expired
      if (token.hasExpired()) {
        // if we need remove this access_token if we use radis cache.
        throw new AuthError('TOKEN.EXPIRED');
      }
      // return user if found.
      return userService.findUserById(token.userId);
    })
    .then(function (user) {
      if (!user) {
        throw new AuthError('USER.UNKNOWN');
      } else {
        return done(null, user, {
          scope: 'all'
        });
      }
    })
    .catch(function (err) {
      // console.log('err', err)
      if (_.isString(err)) {
        err = new AuthError(err);
      }
      var params = [err];
      // capture AuthError
      var error = AUTH_ERROR_MESSAGE[err.code] || {};
      // debug('error: ',AUTH_ERROR_MESSAGE[err.code], error, err.code)
      switch (error.code) {
        case 'TOKEN.EMPTY':
        case 'TOKEN.EXPIRED':
        case 'USER.UNKNOWN':
          params = [null, false, error.message];
          break;
        default:
          params = [null, false, error.message];
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
   * @param  {Array<Number>} roles the user must be in specificed roles.
   *         We can use [SystemRoleName.Administrator] ==>0
   *         can't use SystemRoleName[0] to match roles
   */
  security: function (roles) {

    debug('initial basicAuth.security authentication....', roles);

    if (_.isUndefined(roles)) {
      roles = [];
    }
    if (!_.isArray(roles)) {
      roles = [roles];
    }

    return function (req, res, next) {
      debug('required roles:', roles);

      var user = req.authInfo;
      if (!user) {
        next(new AuthError('USER.UNKNOWN'));
      } else {
        user.isCustomerInRoles(roles).then(function (user) {
          if (user) {
            next();
          } else {
            next(new AuthError('ROLE.NOT_MATCHED_ROLES'));
          }
        });
      }
    };
  }
};
