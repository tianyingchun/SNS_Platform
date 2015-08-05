var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var config = require('./config');
var router = require('./config/router');
var debug = require('debug')(config.appName);

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
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.user(compress());
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

if (app.get('env') === 'development') {
  // only use in development
  app.use(errorhandler());
}

// catch 500 and other error and stop app exec.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  var contentType = req.get('Content-Type');
  switch (contentType) {
    case "application/json":
      helper.renderJson(res, err);
      break;
    default:
      helper.renderAction(res, 'error', {
        message: err.message,
        // production error handler, development will print stacktrace
        error: app.get('env') !== 'production' ? err : {}
      });
      break;
  }
});

module.exports = app;
