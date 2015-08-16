var _ = require('lodash');
var moment = require('moment');
var redis = require('./redis');
var cryptor = require('./cryptor');
var security = require('../config').security;
var Error = require('../constants/Error');

function AccessToken(userId, access_token) {
  this.userId = userId;
  this.created = Date.now();
  this.access_token = access_token;
  this.expire = security.tokenLife;
}

_.extend(AccessToken.prototype, {

  serialize: function () {
    return JSON.stringify({
      userId: this.userId,
      created: this.created
    });
  },
  deSerialize: function (tokenData) {
    try {
      var tokenData = JSON.parse(tokenData);
      this.userId = tokenData.userId;
      this.created = tokenData.created;
      return this;
    } catch (err) {
      throw new Error(err);
    }
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
  // the token will be expose to client.
  genToken: function (user, callback) {

    var at = new AccessToken(user.get('id'));
    var tokenData = at.serialize();
    // current access token
    var accessToken = cryptor.md5(tokenData);

    at.access_token = accessToken;
    try {
      // save it to redis.
      redis.set(accessToken, tokenData);
      // set default expire time second.
      redis.expire(accessToken, at.expire);

      callback(null, accessToken);
    } catch (err) {
      callback(err);
    }
  },
  /**
   * Parse token from redis cache
   * @param  {String}   access_token the client access_token
   * @param  {Function} callback     callback(null, (new AccessToken))
   */
  parseToken: function (access_token, callback) {
    var at = new AccessToken(null, access_token);
    redis.get(access_token, function (err, tokenData) {
      if (err || !tokenData) {
        // query redis exception or redis token expired.
        callback(new Error('ACCESS_TOKEN_REDIS_QUERY_FAILED'));
      } else {
        //return `AccessToken` instance.
        callback(err, at.deSerialize(tokenData));
      }
    });
  }
};
