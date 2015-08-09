var _ = require('lodash');
var q = require('Q');
var logger = require('../common/log');
var systemRoleName = require('../models/enum/SystemRoleName');
var UserModel = require('../models/User');
var RoleModel = require('../models/Role');
var UserService = {
  /**
   * register an new user
   * @param  {Object} user User info
   * @return {promise}
   */
  signup: function (user) {
    var deferred = q.defer();
    UserModel.findOrCreate({
      where: {
        username: user.username,
        email: user.email
      },
      defaults: user

    }).spread(function (user, created) {
      // return new user.
      deferred.resolve(user.get({
        plain: true
      }));
    }).catch(function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  },

  // Login with username, password
  signin: function (username, password) {

  },

  // Log out current session.
  signout: function () {

  },
  /**
   * Find user by some conditions
   * @param  {Object} conditions the conditions
   * @param  {Boolean} showAll: default is false.
   * @return {promise}
   */
  findUserBy: function (conditions, showAll) {
    return UserModel.findOne({
      where: conditions,
      include: [{
        model: RoleModel,
        as: 'roles'
      }],
      where: showAll ? null : {
        active: true,
        deleted: false
      },
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
