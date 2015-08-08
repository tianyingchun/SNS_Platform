var UserService = require('../services/UserService.js');
var lang = require('../common/lang');
var UserCtrl = {

  index: function (req, res, next) {
    res.status(200).send({
      authInfo: req.authInfo
    });
  },

  show: function () {

  },

  create: function (req, res, next) {

  },

  update: function () {

  },

  delete: function () {

  }
};

module.exports = UserCtrl;
