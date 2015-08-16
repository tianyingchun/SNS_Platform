var q = require('Q');
var debug = require('debug')('app:SecurityService');
var cryptor = require('../common/cryptor');
var Error = require('../constants/Error');
var config = require('../config');
var security = config.security;
var AccessToken = require('../common/AccessToken');
var SecurityService = {
  /**
   * Generate encypted password with security code and password salt.
   * @param  {String} password The password
   * @param  {String} salt     The saltCode
   * @return {String}          The encrpted password string.
   */
  getEncryptedPassword: function (password, salt) {
    if (!password) {
      throw new Error('USER.PASSWORD_MUSTBE_REQUIRED');
    }
    var mixPwd = password.trim() + salt + security.saltCode;
    return cryptor.md5(mixPwd);
  },
  getRandomSalt: function () {
    return cryptor.randomString(8);
  },
  /**
   * Genrate random salt for password encryptor.
   * @return {String} the salt
   */
  getRandomBytes: function () {
    return cryptor.randomBytes();
  },
  /**
   * Give method to encrypt user basic information to token
   * @param  {Object} user User model instance
   * @return {String}      access_token
   */
  genAccessToken: function (user) {
    var deferred = q.defer();
    try {
      if (user) {
        debug('SecurityService->genAccessToken...');
        AccessToken.genToken(user, function (err, access_token) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve('Bearer ' + access_token);
          }
        });
      } else {
        deferred.reject(new Error('USER.UNKNOWN'));
      }
    } catch (err) {
      deferred.reject(new Error('TOKEN.GEN_ACCESS_TOKEN_FAILED'));
    }
    return deferred.promise;

  },
  /**
   * Give method to verify current status of access_token from client
   * @param  {String}   access_token the access_token
   * @param  {Function} callback     the callback
   */
  parseAccessToken: function (access_token) {
    var deferred = q.defer();
    try {
      AccessToken.parseToken(access_token, function (err, token) {
        if (err) {
          deferred.reject(err);
        } else {
          debug('parseAccessToken-> from redis `token` is %s', token);
          deferred.resolve(token);
        }
      });
    } catch (err) {
      deferred.reject(err);
    }
    return deferred.promise;
  }
};


module.exports = SecurityService;
