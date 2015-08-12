var _ = require('lodash');
var q = require('q');
var debug = require('debug')('app:UserService');
var Error = require('../config/Error');
var SecurityService = require('../services/SecurityService');
var systemRoleName = require('../models/enum/SystemRoleName');
var UserModel = require('../models/User');
var RoleModel = require('../models/Role');
var UserService = {
  /**
   * register an new user
   * @param  {Object} user User info
   * @param  {Array} user roles, default is 'Registered'
   * @return {promise}
   */
  signup: function (user, roles) {
    if (!roles) roles = ['Registered'];
    if (_.isString(roles)) {
      roles = [roles];
    }
    // Lowry: return this promise to controller.
    return this.findUserBy({
        $or: [{
          username: user.username
        }, {
          email: user.email
        }]
      }, false)
      .then(function (found) {
        debug('the signup user has been created');
        if (!found) {
          return UserModel.create(user);
        } else {
          throw new Error('USER_HAS_EXISTED');
        }
      })
      .then(function (newUser) {
        debug('user create successful');
        return RoleModel.findAll({
          where: {
            name: {
              $in: roles
            }
          }
        }).then(function (roles) {
          if (roles && roles.length) {
            debug('add regular role to user!');
            return newUser.addRoles(roles).then(function () {
              return newUser;
            });
          } else {
            throw new Error('ROLE_CAN_NOT_BE_FOUND');
          }
        });
      });
  },

  // Login with username, password
  signin: function (username, password) {
    return UserModel.findOne({
        where: {
          $or: [{
            username: username
          }, {
            email: username
          }]
        }
      })
      .then(function (user) {
        debug('find user by name/email and password: ', user.get());
        if (!user) {
          throw new Error('USER_SIGNIN_FAILED');
        } else {
          var salt = user.get('passwordSalt');
          var passwordInDb = user.get('password');
          var _password = SecurityService.getEncryptedPassword(password, salt);
          if (_password === passwordInDb) {
            return user;
          } else {
            throw new Error('USER_SIGNIN_FAILED');
          }
        }
      });
  },

  // Log out current session.
  signout: function () {

  },
  /**
   * Find user by some conditions
   * @param  {Object}  required: conditions the conditions
   * @param  {Boolean} includeRole: default true.
   * @param  {Boolean} showAll: default is false.
   * @return {promise}
   */
  findUserBy: function (conditions, includeRole, showAll) {

    includeRole = _.isUndefined(includeRole) ? true : !!includeRole;
    showAll = _.isUndefined(showAll) ? false : !!showAll;
    if (showAll === false) {
      _.extend(conditions, {
        active: true,
        deleted: false
      });
    }
    return UserModel.findOne({
      where: conditions,
      include: includeRole ? [{
        model: RoleModel,
        as: 'roles'
      }] : null
    });
  },
  // Find user model instance
  findUserById: function (userId) {
    return UserModel.findById(userId);
  },
  findUserByName: function (username) {
    return this.findUserBy({
      username: username
    });
  },
  findUserByEmail: function (email) {
    return this.findUserBy({
      email: email
    });
  },
  /**
   * Find all users with corresponding role data allow us pagination.
   * @param  {Number} page start number 1
   * @param  {Number} size
   * @param  {Object} conditions search filter conditions
   * @param  {Boolean} showAll    true show all rows otherwise show actived and deleted==false
   * @return {Promise}
   */
  findAllUsers: function (page, size, conditions, showAll) {
    var _where = {};
    if (_.isObject(conditions)) {
      _where = conditions;
    }
    if (!showAll) {
      _.extend(_where, {
        active: true,
        deleted: false
      });
    }
    if (page == 0) page = 1;
    // now simple use limit, offset, maybe need to use store procedure to improve performance
    var offset = size * (page - 1);

    return UserModel.findAndCountAll({
      include: [{
        model: RoleModel,
        as: 'roles'
      }],
      where: _where,
      offset: offset,
      limit: size
    });
  },
  /**
   * Check if user have owned given foles.
   * @param  {Object} user   user model instance.
   * @param  {Array|String}  roles
   * @return {Promise}
   */
  isCustomerInRoles: function (user, roles) {
    // no given roles, return true skip it.
    if (!roles) roles = [];
    if (_.isString(roles)) {
      roles = [roles];
    }
    var where = {
      id: user.get('id')
    };
    return this.findUserBy(where, false)
      .then(function (user) {
        debug('user: ', user);
        return user.getRoles().then(function (_roles) {
          var matched = false;
          _.forEach(_roles, function (item) {
            var roleName = item.get('name');
            debug('roleName:', roleName, roles);
            if (_.include(roles, roleName)) {
              matched = true;
              debug('found matched role:', roleName);
              return false;
            }
          });
          return (matched ? user : null);
        });
      });
  }
};

// Export constructors.
module.exports = UserService;
