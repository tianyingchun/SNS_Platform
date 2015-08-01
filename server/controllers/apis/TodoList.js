var express = require('express');
var router = express.Router();
var helper = require("../../helpers");
var logger = require("../../helpers/log");

// data provider singleton.
var dataProvider = require("../../dataProvider");
// todoService
var TodoService = dataProvider.getService("Todo");

var todoService = new TodoService();

/**
 * API:/api/todo/list
 * Get all todo items.
 */
router.get("/list", function (req, res) {
  todoService.getTodoList().then(function success(result) {
    helper.renderJson(res, result);
  }, function error(error) {
    helper.renderJson(res, error);
  });
});


module.exports = router;
