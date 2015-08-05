var _ = require('lodash');
var logger = require('../helpers/log');

var systemCustomerRoleNames = require('../models/emun/systemCustomerRoleNames');

function UserService(userIntance) {
  // user model instance.
  this.user = userIntance;

  this.isInCustomerRole = function (customerRoleSystemName, onlyActiveCustomerRoles) {

    onlyActiveCustomerRoles =
      _.isUndefined(onlyActiveCustomerRoles) ? true : onlyActiveCustomerRoles;

    // TODO.

  };
  this.isAdmin = function (onlyActiveCustomerRoles) {
    return this.isInCustomerRole(systemCustomerRoleNames.Administrators, onlyActiveCustomerRoles);
  };

  this.isRegistered = function (onlyActiveCustomerRoles) {
    return this.isInCustomerRole(systemCustomerRoleNames.Registered, onlyActiveCustomerRoles);
  };

  this.isGuest = function (onlyActiveCustomerRoles) {
    return this.isInCustomerRole(systemCustomerRoleNames.Guests, onlyActiveCustomerRoles);
  };

  this.getRewardPointsBalance = function () {
    // TODO
  };
}

module.exports = UserService;
