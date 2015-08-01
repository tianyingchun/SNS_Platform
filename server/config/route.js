var logger = require("../helpers/log");
var helper = require("../helpers");
var ApiTodoList = require('../controllers/apis/TodoList');
var TodoList = require('../controllers/TodoList');
var _app = null;

module.exports = {
  init: function (app) {

    _app = app;

    // allow cros domin supports for all api/* request.
    // _app.all("/api/*", function (req, res, next) {
    //   // setting default timeout for httpserver.
    //   res.setTimeout(10 * 60 * 1000, function () {
    //     logger.error("Nodejs Web server timeout!!!!");
    //     helper.renderJson(res, new Error("Nodejs Web server timeout!!!!"));
    //   });
    //   res.set({
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
    //     "Access-Control-Allow-Headers": "Content-Type"
    //   });
    //   next();
    // });

    _app.use("/api/todo", ApiTodoList);
    //
    _app.use("/todo", TodoList);

  }
};

