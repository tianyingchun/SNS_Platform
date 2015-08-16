var fs = require('fs');
var _ = require('lodash');
var debug = require('debug')('app:ErrorLocale');
var lang = require('../common/lang');
var config = require('../config');
var Error = lang.createError('BusinessError', {
  status: 400
});
// new Error('code', 'message');
module.exports = Error;

// The common Error Instance definitions.
module.exports.ErrorEnum = {
  'ACCESS_DENY': new Error('COMMON.ACCESS_DENY').setStatus(401)
};
module.exports.Message = function (locale) {

  locale = locale || config.locales[0];

  localePath = './errors/' + locale;

  // i18n
  var __DEFINE__ = {};
  try {
    __DEFINE__ = require(localePath);
  } catch (e) {
    localePath = './errors/en_us';
    __DEFINE__ = require(localePath);
  }

  debug('message `locale` is: %s, `localePath` is %s', locale, localePath);

  return {
    /**
     * Get error node
     * @param  {String} errorKey USER.UNKNOWN the format must be <parent.child>== <USER.UNKNOW>
     * @return {Object}          ErrorMessage information
     */
    get: function (errorKey) {
      debug('error locale key: ', errorKey);
      var result = {};
      try {
        var keys = errorKey.split('.');
        if (keys.length == 1) {
          keys[1] = keys[0];
          keys[0] = 'COMMON';
        }
        keys = _.map(keys, function (key) {
          return key.toUpperCase();
        });
        result = __DEFINE__[keys[0]][keys[1]];
      } catch (e) {
        debug('get error message by ' + errorKey + ' failed.');
      }
      return result;
    }
  };
};
