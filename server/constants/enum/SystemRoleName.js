var lang = require('../../common/lang');

var SystemRoleName = lang.createEnum(
  [
    'Administrators',
    'Registered',
    'Publisher'
  ]
);

module.exports = SystemRoleName;
