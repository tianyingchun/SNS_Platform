var userExtentions = {

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
};

module.exports = userExtentions;
