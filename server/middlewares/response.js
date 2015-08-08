var _ = require('lodash');
var accepts = require('accepts');
var escapeHtml = require('escape-html');

var doubleSpaceGlobalRegExp = /  /g
var newLineGlobalRegExp = /\n/g

/**
 * Escape a block of HTML, preserving whitespace.
 * @api private
 */
function escapeHtmlBlock(str) {
  return escapeHtml(str)
    .replace(doubleSpaceGlobalRegExp, ' &nbsp;')
    .replace(newLineGlobalRegExp, '<br>');
}

module.exports = {
  render: function (req, res, next) {
    // grab reference of render
    var _render = res.render;
    // override logic
    res.render = function (view, options, fn) {
      // do some custom logic
      // _.extend(options, {
      //   session: true
      // });
      // continue with original render
      _render.call(this, view, options, fn);
    }
    next();
  },
  /**
   * client error handler to handler json response.
   * @example
   * normally we should new Error() instance, add attach some properties to err
   * using deferred.reject(err)
   * e.g.
   * var err = new Error('error message');
   *     err.code ='100110'
   *     err.description = 'error descriptions.'
   */
  clientErrorHandler: function (err, req, res, next) {
    // respect err.statusCode
    if (err.statusCode) {
      res.statusCode = err.statusCode;
    }

    // respect err.status
    if (err.status) {
      res.statusCode = err.status;
    }

    // default status code to 500
    if (res.statusCode < 400) {
      res.statusCode = 500;
    }
    // negotiate
    var accept = accepts(req);
    var type = accept.type('html', 'json', 'text');
    var error = {
      code: res.statusCode,
      message: err.message
    };
    _.extend(error, err);

    if (type === 'json') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.status(500).send(error);
      // plain text
    } else if (type === 'text') {
      var errorHtml = _.isObject(err) ? err.message : err;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.status(500).send(errorHtml);
    } else {
      errorHtml = _.isObject(err) ? err.message : err;
      var html =
        '<html>' +
        '  <head>' +
        '    <meta charset="utf-8">' +
        '  </head>' +
        '  <body>' +
        '    <div id="wrapper">' +
        '      <h1>Error Occurs</h1>' +
        '      <h2>code:{code}</h2>' +
        '      <h2><em>message:</em>{message}</h2>' +
        '      <h2><em>description:</em>{description}</h2>' +
        '    </div>' +
        '  </body>' +
        '</html>';
      var body = html
        .replace('{code}', error.code)
        .replace('{message}', error.message)
        .replace('{description}', error.description);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(body);
    }
  }
};
