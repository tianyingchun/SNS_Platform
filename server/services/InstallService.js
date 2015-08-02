var q = require('Q');
var logger = require('../helpers/log');
var sequelize = require('../models/sequelize');

function InstallService() {
  /**
   * @return {promise}
   */
  this.initialMysql = function () {
    var deferred = q.defer();

    sequelize.sync({
      force: true,
      match: /_Test$/
    }).then(function () {
      deferred.resolve();
    }).catch(function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };
}

module.exports = InstallService;
