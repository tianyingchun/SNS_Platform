var _ = require('lodash');
var logger = require('../common/log');
var systemRoleName = require('../models/enum/SystemRoleName');

var userService = {
  /**
   * Find user model instance
   * @param  {Number} userId userId
   * @return {Promise}
   */
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
module.exports = userService;
