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
        debug('find user by name/email and password: ', user);
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
        as: 'roles',
        attributes: ['id', 'name', 'active', 'isSystemRole', 'systemName'],
        through: {
          // ignore spm_user_role mapping records
          // "spm_user_role": {
          //   "user_id": "7e22bbe0-40d7-11e5-b331-5dd00d60cbb3",
          //   "role_id": "7e2071f0-40d7-11e5-b331-5dd00d60cbb3"
          // }
          attributes: []
        }
      }],
      where: _where,
      offset: offset,
      limit: size
    });
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
          throw new Error('ROLE.CAN_NOT_BE_FOUND');
        }
      });
  },
  /**
   * Check if user have owned given foles.
   * @param  {Object} user   user model instance.
   * @param  {Array|Number}  roles
   * @return {Promise}
   */
  isCustomerInRoles: function (user, roles) {
    return user.isCustomerInRoles(roles);
  }
};

// Export constructors.
module.exports = UserService;
