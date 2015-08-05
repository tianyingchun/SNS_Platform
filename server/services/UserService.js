var _ = require('lodash');
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

  },

  isInCustomerRole: function (roleSystemName, onlyActivedRoles) {
    onlyActivedRoles = _.isUndefined(onlyActivedRoles) ? true : onlyActivedRoles;
    //TODO
  },
  isAdmin: function (onlyActivedRoles, onlyActivedRoles) {
    return this.isInCustomerRole(systemRoleName.Administrators, onlyActivedRoles);
  },
  isRegistered: function (onlyActivedRoles, onlyActivedRoles) {
    return this.isInCustomerRole(systemRoleName.Registered, onlyActivedRoles);
  },
  isGuest: function (onlyActivedRoles) {
    return this.isInCustomerRole(systemRoleName.Guests, onlyActivedRoles);
  }
};

// Export constructors.
module.exports = UserService;
