var UserService = require('../services/UserService.js');
var lang = require('../common/lang');
var UserCtrl = {

  index: function (req, res, next) {
    // var err = new Error('ddddddddd');
    // err.code = "1000000";
    // err.description = "the error descritption";

    // throw err;

    // next(err);

    res.status(200).send({
      authInfo: req.authInfo
    });
  },

  show: function () {

  },

  create: function (req, res, next) {
    var body = req.body;

    var userInfo = {
      username: body.username,
      email: body.email,
      password: body.password
    };

    UserService.signup(userInfo).then(function (newUser) {
      res.send(newUser);
    }).catch(function (err) {
      next(err);
    });
  },

  update: function () {

  },

  delete: function () {

  }
};

module.exports = UserCtrl;
