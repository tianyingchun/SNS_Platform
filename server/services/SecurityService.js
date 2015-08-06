var logger = require('../common/log');
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

    var token = {
      userId: 'test',
      created: 1438876837717
    };
    callback(null, token);
  }
};


module.exports = SecurityService;
