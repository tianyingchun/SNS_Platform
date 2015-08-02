var q = require('Q');
var logger = require('../helpers/log');
var sequelizeInitializer = require('../models/initializer');

function InstallService() {
  /**
   * initialize mysql database.
   */
  this.installMysql = function () {

    sequelizeInitializer.syncDB().then(function (result) {

    }, function (err) {

    });
  };
}

module.exports = InstallService;
