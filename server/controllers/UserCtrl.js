var Error = require('../config/Error');
var UserService = require('../services/UserService');
var SecurityService = require('../services/SecurityService');
var lang = require('../common/lang');
var UserCtrl = {

  index: function (req, res, next) {
    // var err = new Error('ddddddddd');
    // err.code = "1000000";
    // err.description = "the error descritption";

    // throw err;

    // next(err);

    res.send({
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

    debug.module('UserCtrl')('creating new user username: %s, passowrd: %s ', userInfo.username, userInfo.password);

    UserService.signup(userInfo).then(function (newUser) {
      res.send(newUser);
    }).catch(function (err) {
      next(err);
    });
  },

  // User sigin controller
  signin: function (req, res, next) {
    var
      body = req.body,
      username = body.username,
      password = body.password;

    UserService.signin(username, password)
      .then(function (user) {
        if (!user) {
          next(new Error('USER_SIGNIN_FAILED'));
        } else {
          var userId = user.get('id');
          // send access_token to client.
          var access_token = SecurityService.genAccessToken({
            userId: user.get('id')
          });
          res.send({
            access_token: access_token
          });
        }
      })
      .catch(function (err) {
        next(err);
      });
  },

  update: function () {

  },

  delete: function () {

  }
};

module.exports = UserCtrl;
