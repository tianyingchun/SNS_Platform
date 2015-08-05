var _ = require('underscore');
var logger = require('../helpers/log');
var sequelize = require('../models/sequelize');
var systemRoleNames = require('./emun/systemRoleNames');


function UserService() {

}
_.extend(UserService, {
  /**
   * Find user model instance
   * @param  {Number} userId userId
   * @return {Promise}
   */
  findUser: function (userId) {

  },
  isInCustomerRole: function (roleSystemName, onlyActivedRoles) {
    onlyActivedRoles =
      _.isUndefined(onlyActivedRoles) ? true : onlyActivedRoles;
    //TODO
  },
  isAdmin: function (onlyActivedRoles, onlyActivedRoles) {
    return this.isInCustomerRole(systemRoleNames.Administrators, onlyActivedRoles);
  },
  isRegistered: function (onlyActivedRoles, onlyActivedRoles) {
    return this.isInCustomerRole(systemRoleNames.Registered, onlyActivedRoles);
  },
  isGuest: function (onlyActivedRoles) {
    return this.isInCustomerRole(systemRoleNames.Guests, onlyActivedRoles);
  }

});

module.exports = UserService;
