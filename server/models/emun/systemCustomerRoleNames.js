var lang = require('../../helpers/lang');

var systemCustomerRoleNames = lang.createEnum(
  [
    'Administrators',
    'Registered',
    'Guests'
  ]
);

module.exports = systemCustomerRoleNames;

