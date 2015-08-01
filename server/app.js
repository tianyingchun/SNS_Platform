var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config')();
var route = require('./config/route');
var helper = require('./helpers');
var debug = require('debug')(config.appName);
//For requiring `.jsx` files as Node modules
require('node-jsx').install({
  harmony: true,
  extension: '.jsx'
});

var React = require('react');
// May we should use react Async to render html in server side.
// var ReactAsync = require('react-async');
var Router = require('react-router-component')
var Pages = Router.Pages
var Page = Router.Page

var RouterStrap = require('../app/routers/App.jsx');

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


// express.static.mime.define({
//  'text/xml': ['plist']
// });
// the default is "/" capture the static dir as all static resource root.
app.use("/static", express.static(path.join(__dirname, '../public')));


// Initialize application routing configuraton.
route.init(app);

app.use('/', function (req, res) {
  res.render('index', {
    content: ''
  })
});
// Render React on Server
// app.use(function (req, res, next) {
//   res.setHeader('Content-Type', 'text/html');
//   var appFactory = React.createFactory(RouterStrap);
//   var markup = React.renderToString(appFactory({path: req.path}));
//   res.send('<!DOCTYPE html>' + markup.replace('<%=pageTitle%>', config.appName));
// });

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('404 Not Found!');
  err.status = 404;
  next(err);
});

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
