// logger utilities
var winston = require('winston');
var fs = require("fs-extra");
var path = require("path");
var lang = require("./lang");

winston.emitErrs = false;
// data provider singleton.
var logdir = "./logs";

if (logdir) {
  fs.ensureDirSync(logdir);
}
// make log files with current day.
var _filename = path.join(logdir, lang.formatDate(new Date(), "YYYY-MM-DD") + ".log");

fs.ensureFileSync(_filename);

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: _filename || './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: true
});
module.exports = logger;
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};
