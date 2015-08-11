var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var morgan = require('morgan');
var cors = require('cors');
var errorhandler = require('errorhandler');
var config = require('./config');
var _debug = require('debug');

//--Attach debug to global---//
global.debug = _debug(config.appName);
// Add namespacing support to specific file module
// debug('UserCtrl')(info1,info2,info3)
global.debug.module = function (name) {
  var __debug = _debug(config.appName);
  if (name) {
    __debug = _debug(config.appName + ":" + name);
  }
  return function (args) {
    var args = Array.prototype.slice.call(arguments, 0);
    __debug.apply(__debug, args);
  }
};
//--Attach debug to global---//

var router = require('./router');
var response = require('./middlewares/response');

//For requiring `.jsx` files as Node modules
require('node-jsx').install({
  harmony: true,
  extension: '.jsx'
});

var app = express();

// debug version.
app.set('env', config.mode);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(compress());
// express.static.mime.define({
//  'text/xml': ['plist']
// });

// the default is "/" capture the static dir as all static resource root.
app.use("/static", express.static(path.join(__dirname, '../public')));

// Initialize application routing configuraton.
app.use('/api/v1', cors(), router);

// TODO: when finish client code, init client here.
// app.use('/', client);
//

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('404 Not Found!');
  err.status = 404;
  next(err);
});

// only use in development
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

// for production error handling.
// handle client json exceptions.
app.use(response.clientErrorHandler);

module.exports = app;
