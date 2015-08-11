var q = require('Q');
var debug = require('debug')('app:SecurityService');

var Error = require('../config/Error');
var config = require('../config');
var security = config.security;
var cryptor = require('../common/cryptor');


var SecurityService = {
  /**
   * Generate encypted password with security code and password salt.
   * @param  {String} password The password
   * @param  {String} salt     The saltCode
   * @return {String}          The encrpted password string.
   */
  getEncryptedPassword: function (password, salt) {
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
    var token = {
      userId: user.userId,
      created: Date.now()
    };
    try {
      var access_token = cryptor.encryptDES(JSON.stringify(token), security.desSecret);
      return 'Bearer ' + access_token;
    } catch (e) {
      throw new Error('GEN_ACCESS_TOKEN_FAILED');
    }
  },
  /**
   * Give method to verify current status of access_token from client
   * @param  {String}   access_token the access_token
   * @param  {Function} callback     the callback
   */
  parseAccessToken: function (access_token) {

    var deferred = q.defer();
    try {
      var token = JSON.parse(cryptor.decryptDES(access_token, security.desSecret));
      deferred.resolve(token);
    } catch (e) {
      deferred.reject(e);
    }
    return deferred.promise;
  }
};


module.exports = SecurityService;
