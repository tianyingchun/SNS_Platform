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

    // current user. only current user only show it's own user information.
    if (user && (userId === user.get('id') || user.isAdmin())) {
      debug('current user matched!');
      UserService.findUserById(userId).then(function (user) {
        if (user) {
          res.send(user.toShortPlainInfo());
        } else {
          next(new Error('USER.UNKNOWN'));
        }
      }).catch(function (err) {
        next(err);
      });
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
        var resUserInfo = newUser.toShortPlainInfo();
        res.send(resUserInfo);
      } else {
        next(new Error('USER.SIGN_UP_FAILED'));
      }
    }).catch(function (err) {
      next(err);
    });
  },

  // User sigin controller
  signin: function (req, res, next) {
    var body = req.body;
    var username = body.username || body.email;
    var password = body.password;

    UserService.signin(username, password)
      .then(function (user) {
        if (!user) {
          next(new Error('USER.SIGNIN_FAILED'));
        } else {
          // send access_token to client.
          SecurityService.genAccessToken(user)
            .then(function (access_token) {
              res.send({
                access_token: access_token
              });
            }).catch(function (err) {
              next(err);
            });
        }
      })
      .catch(function (err) {
        next(err);
      });
  },
  // user signout
  signout: function (req, res, next) {
    var user = req.authInfo;
    if (!user) {
      next(new Error('USER.UNKNOWN'));
    } else {
      var access_token = user.access_token;
      if (!access_token) {
        next(new Error('TOKEN.EMPTY'));
      } else {
        // destroy access token.
        SecurityService.destroyAccessToken(access_token)
          .then(function (count) {
            res.json({
              effectCount: count
            });
          })
          .catch(function (err) {
            next(err);
          });
      }
    }
  },
  // Require token protect
  update: function (req, res, next) {
    var newUserInfo = req.body;
    var user = req.authInfo;
    var userId = req.params.id;
    debug("newUserInfo: ", newUserInfo);
    // only can update own userinfo except you are administrator role.
    if (user && (userId === user.get('id') || user.isAdmin())) {
      UserService.updateUser(userId, newUserInfo, ['email'])
        .then(function (updatedUser) {
          if (updatedUser) {
            res.send(updatedUser.toShortPlainInfo());
          } else {
            next(new Error('USER.UPDATE_USER_FAILED'));
          }
        })
        .catch(function (err) {
          next(err);
        });
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
      next(new Error('USER.CANT_DELETE_YOUR_SELF'));
    } else {
      UserService.destroyUser(userId)
        .then(function (user) {
          debug('destoryed user..', user);
          if (user.get('deleted')) {
            res.send(user.toShortPlainInfo());
          } else {
            next(new Error('USER.DESTROY_FAILED'));
          }
        }).catch(function (err) {
          next(err);
        });
    }
  }
};

module.exports = UserCtrl;
