var _ = require('lodash');

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
  }
};
