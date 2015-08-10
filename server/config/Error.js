var lang = require('../common/lang');
var Error = lang.createError('BusinessError', {
  status: 400
});
// new Error('code', 'message');
module.exports = Error;
module.exports.Message = function (locale) {
  // i18n
  return {
    'USER_HAS_EXISTED': {
      code: 'USER_HAS_EXISTED',
      message: 'user has been existed'
    },
    'ROLE_CAN_NOT_BE_FOUND': {
      code: 'ROLE_CAN_NOT_BE_FOUND',
      message: 'can not find the records using given roles'
    }
  };
};
