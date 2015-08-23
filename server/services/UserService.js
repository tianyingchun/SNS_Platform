var _ = require('lodash');
var q = require('q');
var debug = require('debug')('app:UserService');
var Error = require('../constants/Error');
var SecurityService = require('../services/SecurityService');
var systemRoleName = require('../constants/enum/SystemRoleName');
var UserModel = require('../models/User');
var RoleModel = require('../models/Role');
var UserService = {
  /**
   * register an new user
   * @param  {Object} user User info
   * @param  {Array<Number>} user roles, default is 'Registered'
   * @return {promise}
   */
  signup: function (user, roles) {
    if (_.isUndefined(roles)) {
      roles = [systemRoleName.Registered];
    }
    if (!_.isArray(roles)) {
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
          throw new Error('USER.HAS_EXISTED');
        }
      })
      .then(function (newUser) {
        debug('user create successful');
        return RoleModel.findAll({
          where: {
            systemName: {
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
            throw new Error('ROLE.CAN_NOT_BE_FOUND');
          }
        });
      });
  },
  // Login with username, password
  signin: function (username, password) {
    return UserModel.scope(['defaultScope', 'activeUsers']).findOne({
        where: {
          $or: [{
            username: username
          }, {
            email: username
          }]
        }
      })
      .then(function (user) {
        debug('found userid: %s by name/email and password: ', user.id);
        if (!user) {
          throw new Error('USER.SIGNIN_FAILED');
        } else {
          var salt = user.get('passwordSalt');
          var passwordInDb = user.get('password');
          var _password = SecurityService.getEncryptedPassword(password, salt);
          if (_password === passwordInDb) {
            return user;
          } else {
            throw new Error('USER.SIGNIN_FAILED');
          }
        }
      });
  },
  //@private
  _mixinScopes: function (scope) {
    var _scope = ['defaultScope'];
    if (_.isArray(scope)) {
      _scope = _scope.concat(scope);
    } else if (_.isString(scope)) {
      _scope.push(scope);
    }
    debug('_mixinScopes: ', _scope);
    return _scope;
  },
  /**
   * Find user by some conditions
   * @param  {Object}  required: query conditions
   * @param  {String|Array} scope: specific the scopes for query
   * @return {promise}
   */
  findUserBy: function (query, scope) {
    scope = this._mixinScopes(scope);
    return UserModel.scope(scope).findOne({
      where: query
    });
  },
  // Find user model instance
  // maybe we should return profile information to client.
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
   * Update specifc user info, if admin role can update any user infomation
   * otherwise only can update itself.
   * @param  {String} userId   the userid
   * @param  {Object} userInfo the new user data
   * @param  {Array} fields   the fields you want to specific column
   *                          list which fields we can update. maybe we can't update username, email.
   * @return {Promise}
   */
  updateUser: function (userId, userInfo, fields) {
    return this.findUserById(userId)
      .then(function (user) {
        return user.update(userInfo, fields || {});
      });
  },
  /**
   * Find all users with corresponding role data allow us pagination.
   * @param  {Number} page start number 1
   * @param  {Number} size
   * @param  {String|Array<String>} UserModel scope
   * @param  {Object} query search filter conditions
   * @param  {Boolean} showAll    true show all rows otherwise show actived and deleted==false
   * @return {Promise}
   */
  findAllUsers: function (page, size, scope, query) {

    if (page == 0) page = 1;
    // now simple use limit, offset, maybe need to use store procedure to improve performance
    var offset = size * (page - 1);
    scope = this._mixinScopes(scope);

    // TODO Note. findAndCountAll has an bug ? while using scope().
    // So we must first get count(). then findAll().
    return UserModel.scope(null).count().then(function (count) {
      if (count === 0) {
        return {
          count: count || 0,
          rows: []
        };
      }
      return UserModel.scope(scope).findAll({
        where: query,
        offset: offset,
        limit: size
      }).then(function (results) {
        return {
          count: count || 0,
          rows: (results && _.isArray(results) ? results : [])
        };
      });
    });
  },
  /**
   * Find all active users
   * @param  {Number} page  page number
   * @param  {Number} size  page size
   * @param  {Object} query query conditions
   * @return {Promise}
   */
  findAllActiveUsers: function (page, size, query) {
    return this.findAllUsers(page, size, 'activeUsers', query);
  },
  // delete user information.
  destroyUser: function (userId) {
    return this.findUserById(userId)
      .then(function (user) {
        if (user) {
          // can't be delete if it's system builtin account.
          if (user.get('isSystemAccount')) {
            throw new Error('USER.CANT_DELETE_SYSTEM_BUILTIN_ACCOUNT');
          } else {
            // only flag deleted fields.
            return user.update({
              deleted: true
            });
          }
        } else {
          throw new Error('USER.CAN_NOT_BE_FOUND');
        }
      });
  },
  /**
   * Check if user have owned given foles.
   * @param  {Object} user   user model instance.
   * @param  {Array|Number}  roles
   * @return {Boolean}
   */
  isCustomerInRoles: function (user, roles) {
    return user.isCustomerInRoles(roles);
  }
};

// Export constructors.
module.exports = UserService;
