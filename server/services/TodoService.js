var logger = require('../helpers/log');

function TodoServiceProvider() {
  /**
   * @return {promise}
   */
  this.getTodoList = function () {
    return [];
  };
}

module.exports = TodoServiceProvider;
