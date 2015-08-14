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
    var user = req.authInfo;
    var query = req.query;
    var page = query.page || 1;
    var size = query.size || 10;
    debug('get all users: get parsms: ', query);
    // if is admin, it null indicates permission
    // TODO. maybe we should use privilege to authorize
    if (user) {
      UserService.findAllUsers(page, size).then(function (users) {
        res.send(users);
      }).catch(function (err) {
        next(err);
      });
    } else {
      // given 401 to client.
      var err = new Error('ACCESS_DENY');
      err.status = 401;
      next(err);
    }
  },

  /**
   * Show User infomation
   * @return {Promise}     The user information.
   */
  show: function (req, res, next) {
    var user = req.authInfo;
    var userId = req.params.id;
    debug('userId:', userId);
    debug('authInfo: ', user);
    var err = new Error('ACCESS_DENY');
    err.status = 401;
    if (user) {
      // current user. only current user only show it's own user information.
      if (userId === user.get('id')) {
        debug('current user matched!');
        UserService.findUserById(userId).then(function (user) {
          res.send(user.get());
        }).catch(function (err) {
          next(err);
        })
      } else {
        next(err);
      }
    } else {
      next(err);
    }
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
      username = body.username || body.email,
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
