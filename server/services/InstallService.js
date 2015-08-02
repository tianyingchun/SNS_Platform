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
    }).then(function (result) {
      deferred.resolve(result);
    }).catch(function (err) {
      logger.error(err);
      deferred.reject(err);
    });

    return deferred.promise;
  };
}

module.exports = InstallService;
