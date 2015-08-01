/**
 * Provider base util function for all child controller.
 * @type {[type]}
 */
var _ = require("underscore");
var path = require('path');

var config = require("../config")();
var logger = require("../helpers/log");

/**
 * Get application base url
 * @param  {request} req       http request
 * @param  {quer} queryPath query path  'order/list' -->http://baidu.com:10/virtual/order/list
 */
var getBaseUrl = function (req, queryPath) {
  var rootPath = [req.host.toString()];
  // for local environment.
  if (config.mode != 'production' && config.port) {
    rootPath.push(":" + config.port);
  } else if (config.nginxPort) {
    // if public access url has port number eg. ngix server. (10.x.x.x:8082--->localhost:3000)
    // we need to set baseurl port.
    rootPath.push(":" + config.nginxPort);
  } else if (config.port) {
    rootPath.push(":" + config.port);
  }
  if (config.virtualDir) {
    rootPath.push("/" + config.virtualDir);
  }
  if (queryPath) {
    rootPath.push("/" + queryPath);
  }
  // return
  var baseUrl = req.protocol + "://" + path.normalize(rootPath.join(""));

  logger.debug("getBaseUrl(): ", baseUrl);

  return baseUrl;
}


module.exports = {
  //
  getBaseUrl: getBaseUrl,
  // Mixin utility
  mixin: function (source, target) {
    return _.extend(source || {}, target);
  },

  isError: function (res, data, options) {
    // first check error.
    if (data && data instanceof Error) {
      return true;
    }
    return false;
  },
  // render json data for api request.
  // option, maybe set customied header config.
  renderJson: function (res, data, options) {
    var status = 200,
      message = '';

    // first check error.
    if (this.isError(res, data, options)) {
      status = data.status || (options && options.status) || 500;
      message = data.message || 'The unknown exception!';
    }
    res.status(status).json({
      code: status,
      data: data || null,
      message: message
    });
  },
  // render server side page.
  renderAction: function (res, action, data, options) {
    var status = 200,
      stack = '',
      message = '';
    if (this.isError(res, data, options)) {
      status = data.status || 500;
      message = data.message || 'The unknown exception!';
      stack = data.stack || JSON.stringify(data)
      res.render(action, {
        message: message,
        error: data
      });
    } else {
      res.render(action, {
        result: data
      });
    }
  }
};
