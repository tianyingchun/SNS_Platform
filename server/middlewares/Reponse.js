var _ = require('lodash');
var path = require('path');
var logger = require('../common/log');
module.exports = {
  // capture json api request, normalize reponse data structure.
  send: function (req, res, next) {

  },
  //
  render: function (req, res, next) {

    res._render = res.render;

    // override render.
    res.render = function (view, options, fn) {

      var t = new Date();

      res._render(view, options, fn);

      var duration = (new Date() - t);

      logger.debug("Render view", view, ("(" + duration + "ms)").green);
    };

    next();
  }
};
