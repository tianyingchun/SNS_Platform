var Error = require('../config/Error');
var UserService = require('../services/UserService');
var SecurityService = require('../services/SecurityService');
var lang = require('../common/lang');
var debug = require('debug')('app:UserCtrl');
var UserCtrl = {

  /**
   * List all users
   * specific permiss role required.
   */
  index: function (req, res, next) {
    // TODO. maybe we need to give multi roles and list it's corresponding user
    var authInfo = req.authInfo;
    var query = req.query;
    var page = query.page || 1;
    var size = query.size || 10;
    debug('get all users: get parsms: ', query);

    UserService.findAllUsers(page, size).then(function (users) {
      res.send(users);
    }).catch(function (err) {
      next(err);
    });
  },

  show: function () {

  },

  // Create new user  and generate empty profile information
  create: function (req, res, next) {
    var body = req.body;
    var userInfo = {
      username: body.username,
      email: body.email,
      password: body.password
    };

    debug('creating new user username: %s, passowrd: %s ', userInfo.username, userInfo.password);

    // return new user info to client if success.
    UserService.signup(userInfo).then(function (newUser) {
      if (newUser) {
        var resUserInfo = {
          id: newUser.get('id'),
          username: newUser.get('username'),
          email: newUser.get('email'),
          active: newUser.get('active')
        };
        res.send(resUserInfo);
      }
      res.send(null);
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
          // send access_token to client.
          var access_token = SecurityService.genAccessToken(user);
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
