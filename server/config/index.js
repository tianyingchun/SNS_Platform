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
  saltCode: 'SPM',
  // The token expired time second
  tokenLife: 24 * 60 * 60 * 7
};
// mysql database.
var db = {
  database: 'SNS_Platform_Test',
  username: 'root',
  password: '19861121.lr',
  // db configuration.
  options: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3307,
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
