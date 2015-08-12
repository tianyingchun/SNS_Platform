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
var router = require('./router');
var response = require('./middlewares/response');
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

// app.get('env') equls process.env.NODE_ENV
// only use in development
if (app.get('env') === 'development') {
  console.log('===Note: the app now in debug mode===');
  app.use(errorhandler());
}

// for production error handling.
// handle client json exceptions.
app.use(response.clientErrorHandler);

module.exports = app;
