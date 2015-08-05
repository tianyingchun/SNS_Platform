var lang = require('../../helpers/lang');

var OrderStatus = lang.createEnum(
  [
    'Initial',
    'Processing',
    'Completed',
    'Cancelled',
    'Expired'
  ]
);

module.exports = OrderStatus;
