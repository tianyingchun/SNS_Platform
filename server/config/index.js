var _ = require("lodash");

// site configuration.
var config = {
  appName: "SNS-Platform",
  defaultDataProvider: "mysql" // maybe sqlserver
};

// node process configuration
var node = {
  port: 3000
};

// security configuration.
var security = {
  saltCode: 'SPM'
};
// mysql database.
var db = {
  database: 'SNS_Platform_Test',
  username: 'sns',
  password: 'sns',
  // db configuration.
  options: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    timezone: '+08:00',
    logging: console.log
  },
  getTableName: function (tabName) {
    // Social network marketing platform
    return 'spm_' + tabName.toLowerCase();
  }
};

// exports site configuration.
module.exports = _.extend({}, config, {
  db: db,
  node: node,
  security: security
});
