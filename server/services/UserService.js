var _ = require('lodash');
var q = require('Q');
var logger = require('../common/log');
var systemRoleName = require('../models/enum/SystemRoleName');

var UserService = {
  /**
   * register an new user
   * @param  {Object} user User info
   * @return {promise}
   */
  signup: function (user) {

  },

  // Login with username, password
  signin: function (username, password) {

  },

  // Log out current session.
  signout: function () {

  },

  // Find user model instance
  findUser: function (userId) {
    var deferred = q.defer();
    deferred.resolve({
      userId: userId,
      name: 'tianyingchun',
      password: 'password'
    });
    // deferred.resolve();
    return deferred.promise;
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
