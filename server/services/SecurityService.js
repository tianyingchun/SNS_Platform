var q = require('Q');
var debug = require('debug')('app:SecurityService');
var cryptor = require('../common/cryptor');
var Error = require('../constants/Error');
var config = require('../config');
var security = config.security;
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
  /**
   * Get password salf using cryptor.
   * @return {String}
   */
  getRandomSalt: function () {
    return cryptor.randomString(8);
  },
  /**
   * Genrate random salt for password encryptor.
   * @return {String} the salt
   */
  getRandomBytes: function () {
    return cryptor.randomBytes();
  }
};


module.exports = SecurityService;
