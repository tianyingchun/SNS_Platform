var logger = require('../helpers/log');
var config = require('../config');
var security = config.security;
var cryptor = require('../helpers/cryptor');


var securityService = {
  /**
   * Generate encypted password with security code and password salt.
   * @param  {String} password The password
   * @param  {String} salt     The saltCode
   * @return {String}          The encrpted password string.
   */
  getEncryptedPassword: function (password, salt) {
    var mixPwdurn = password.trim() + salt + security.saltCode;
    return cryptor.md5(mixPwd);
  },
  /**
   * Genrate random salt for password encryptor.
   * @return {String} the salt
   */
  getRandomSalt: function () {
    return cryptor.randomBytes();
  },
  /**
   * Give method to verify current status of access_token from client
   * @param  {String}   access_token the access_token
   * @param  {Function} callback     the callback
   */
  checkAccessTokenStatus: function (access_token, callback) {

    // callback(err, token);
  }
};


module.exports = securityService;
