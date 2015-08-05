var _ = require('lodash');
var url = require('../config').url;
var lang = require('./lang')

module.exports = {

  // Get root url for entire app.
  getAppBaseUrl: function (path) {
    return lang.formatString(url.appBaseUrl, path);
  },
  getAppImageBaseUrl: function (path) {
    return lang.formatString(url.imageBaseUrl, path);
  }
};
