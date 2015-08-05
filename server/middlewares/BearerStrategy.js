var _ = require('lodash');

module.exports = {
  security: function (roles) {
    if (_.isString(roles)) {
      roles = [roles];
    }

    return function (req, res, next) {

    };
  }
};
