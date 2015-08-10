var _ = require('lodash');
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
        debug('find user by name and password: ', user);
        var salt = user.get('passwordSalt');
        var _password = SecurityService.getEncryptedPassword(password, salt);
        return UserModel.findOne({
          where: {
            $or: [{
              username: user.username
            }, {
              email: user.username
            }],
            password: _password
          }
        });
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
   * @param  {Number} pageIndex start number 1
   * @param  {Number} pageSize
   * @param  {Object} conditions search filter conditions
   * @param  {Boolean} showAll    true show all rows otherwise show actived and deleted==false
   * @return {Promise}
   */
  findAllUsers: function (pageIndex, pageSize, conditions, showAll) {
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

    // now simple use limit, offset, maybe need to use store procedure to improve performance
    var limit = pageIndex * (pageSize - 1);

    return UserModel.findAndCountAll({
      include: [{
        model: RoleModel,
        as: 'roles'
      }],
      where: _where,
      offset: pageSize,
      limit: limit
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
    //TODO...
    var deferred = q.defer();
    // _(roles).forEach(function (item) {
    //   if (item == "administrator") {
    //     return false;
    //   }
    // });

    // var err = new Error('ddddddddd');
    // err.code = "1000000";
    // err.description = "the error descritption";

    // throw err;
    // deferred.reject(err);
    deferred.resolve(_.extend(user, {
      roles: ['administrator']
    }));

    return deferred.promise;
  },

  isInCustomerRole: function (roleSystemName, onlyActivedRoles) {
    onlyActivedRoles = _.isUndefined(onlyActivedRoles) ? true : onlyActivedRoles;
    //TODO
  },
  isAdmin: function (onlyActivedRoles) {
    return this.isInCustomerRole(systemRoleName.Administrators, onlyActivedRoles);
  },
  isRegistered: function (onlyActivedRoles) {
    return this.isInCustomerRole(systemRoleName.Registered, onlyActivedRoles);
  },
  isGuest: function (onlyActivedRoles) {
    return this.isInCustomerRole(systemRoleName.Guests, onlyActivedRoles);
  }
};

// Export constructors.
module.exports = UserService;
