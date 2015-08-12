var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var morgan = require('morgan');
var cors = require('cors');
var errorhandler = require('errorhandler');
var locale =  require('locale');
var csurf = require('csurf');
var config = require('./config');
var router = require('./router');
var response = require('./middlewares/response');
var setLocale = require('./middlewares/setLocale');
var association = require('./models/association');
//For requiring `.jsx` files as Node modules
require('node-jsx').install({
  harmony: true,
  extension: '.jsx'
});

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Current environment
// app.get('env') equls process.env.NODE_ENV
var NODE_ENV = app.get('env') || 'production';

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(compress());
// the default is "/" capture the static dir as all static resource root.
app.use("/static", express.static(path.join(__dirname, '../public')));

// set default locale
// referecen: https://github.com/gpbl/isomorphic500
locale.Locale.default = config.locales[0];

// Set req.locale based on the broswer settings.
app.use(locale(config.locales));

// Overwrite req.locale either from cookie or querystring
app.use(setLocale);

// This is used by the fetchr plugin.
app.use(csurf({cookie: true}));

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
if (NODE_ENV === 'development') {
  console.log('===Note: the app now in debug mode===');
  app.use(errorhandler());
}

// for production error handling.
// handle client json exceptions.
app.use(response.clientErrorHandler);

module.exports = app;
