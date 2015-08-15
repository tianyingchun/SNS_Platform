var Error = require('../constants/Error');
var ErrorEnum = Error.ErrorEnum;
var UserService = require('../services/UserService');
var SecurityService = require('../services/SecurityService');
var lang = require('../common/lang');
var debug = require('debug')('app:UserCtrl');
var redis = require('../common/redis');
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
      next(ErrorEnum.ACCESS_DENY);
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
    var err = ErrorEnum.ACCESS_DENY;
    if (user) {
      // current user. only current user only show it's own user information.
      if (userId === user.get('id')) {
        debug('current user matched!');
        UserService.findUserById(userId).then(function (user) {
          res.send(user.toJsonValue());
        }).catch(function (err) {
          next(err);
        });
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
        var resUserInfo = newUser.toJsonValue();
        res.send(resUserInfo);
      }
      res.send(null);
    }).catch(function (err) {
      next(err);
    });
  },

  // User sigin controller
  signin: function (req, res, next) {
    var body = req.body,
      username = body.username || body.email,
      password = body.password;

    redis.get('token', function (err, result) {
      debug('redis: token:', result);
    });
    UserService.signin(username, password)
      .then(function (user) {
        if (!user) {
          next(new Error('USER_SIGNIN_FAILED'));
        } else {
          // send access_token to client.
          var access_token = SecurityService.genAccessToken(user);
          redis.set('token', access_token);
          res.send({
            access_token: access_token
          });
        }
      })
      .catch(function (err) {
        next(err);
      });
  },

  // Require token protect
  update: function (req, res, next) {
    var newUserInfo = req.body;
    debug("newUserInfo: ", newUserInfo);
    var user = req.authInfo;
    if (user) {
      user.update(newUserInfo, {
          fields: ['email'] // list which fields we can update. maybe we can't update username, email.
        })
        .then(function (newUser) {
          res.send(user.toJsonValue());
        }).catch(function (err) {
          next(err);
        })
    } else {
      next(ErrorEnum.ACCESS_DENY);
    }
  },
  // Require administrator roles permission.
  delete: function (req, res, next) {
    var user = req.authInfo;
    var userId = req.params.id;
    // can not delete current user.
    if (userId === user.get('id')) {
      next(new Error('CANT_DELETE_YOUR_SELF'));
    } else {
      UserService.destroyUser(userId)
        .then(function (user) {
          debug('destoryed user..', user);
          if (user.get('deleted')) {
            res.send('success');
          } else {
            next(new Error('DESTROY_USER_FAILED'));
          }
        }).catch(function (err) {
          next(err);
        });
    }
  }
};

module.exports = UserCtrl;
