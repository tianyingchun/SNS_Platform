var logger = require('../helpers/log');
var q = require('Q');
function TodoService() {
  /**
   * @return {promise}
   */
  this.getTodoList = function () {
    var deferred = q.defer();
    deferred.resolve([
      {id:'111', title:'title1', description:'description1'},
      {id:'111', title:'title1', description:'description1'},
      {id:'111', title:'title1', description:'description1'},
      {id:'111', title:'title1', description:'description1'}
    ]);
    return deferred.promise;
  };
}

module.exports = TodoService;
