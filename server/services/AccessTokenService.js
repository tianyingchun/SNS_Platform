var _ = require('lodash');
var moment = require('moment');
var lang = require('../common/lang');
var _cacheManager = require('./CacheService').new({
  prefix: 'access_token:'
});
var cryptor = require('../common/cryptor');
var security = require('../config').security;
var Error = require('../constants/Error');
var debug = require('debug')('app:AccessTokenService');

function AccessToken(userId, access_token) {
  this.userId = userId;
  this.created = Date.now();
  this.access_token = access_token;
  this.expire = security.tokenLife;
}

_.extend(AccessToken.prototype, {

  getPlainData: function () {
    return {
      userId: this.userId,
      created: this.created
    };
  },
  // if current has been expired.
  hasExpired: function () {
    // Math.round((Date.now() - token.created) / 1000) > config.security.tokenLife
    // make sure, current instance has been parse from redis.
    if (!this.userId) {
      throw new Error('ACCESS_TOKEN_REQUIRED_USER_ID');
    }
    var expireTime = moment(this.created).add(this.expire, 's');
    if (moment().isBefore(expireTime)) {
      return false;
    }
    return true;
  }
});

module.exports = {
  /**
   * Give method to encrypt user basic information to token
   * @param  {Object} user User model instance
   * @return {Promise<String>}      access_token
   */
  genToken: function (user) {
    debug('TokenService->genToken...');
    var at = new AccessToken(user.get('id'));
    var tokenData = at.getPlainData();
    // current access token
    at.access_token = cryptor.md5(tokenData);
    return _cacheManager.set(at.access_token, tokenData, at.expire)
      .then(function (result) {
        return 'Bearer ' + at.access_token;
      });
  },
  /**
   * Give method to delete access token from redis
   * @param  {String} access_token the client access_token
   * @return {Promise<boolean>}
   */
  destroyToken: function (access_token) {
    // set expired time ==0 second.
    // @count The number of keys that were removed
    return _cacheManager.remove(access_token)
      .then(function (result) {
        // true: remove success.
        return result;
      });
  },
  /**
   * Parse token from redis cache
   * @param  {String}   access_token the client access_token
   * @param  {Function} callback     callback(null, (new AccessToken))
   */
  parseToken: function (access_token) {
    var at = new AccessToken(null, access_token);
    return _cacheManager.get(access_token)
      .then(function (tokenData) {
        debug('parseToken()->tokenData: ', tokenData);
        return _.extend(at, tokenData);
      });
  }
};
