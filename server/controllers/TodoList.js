var express = require('express');
var router = express.Router();
var helper = require("../helpers");
var logger = require("../helpers/log");

// data provider singleton.
var dataProvider = require("../dataProvider");
// todoService
var TodoService = dataProvider.getService("Todo");

var todoService = new TodoService();
/**
 * URL :/todo/list
 * Get all todo items.
 */
router.get("/list", function (req, res) {
  todoService.getTodoList().then(function success(result) {
    helper.renderAction(res, 'todoList', result);
  }, function error(error) {
    helper.renderAction(res, 'error', error);
  });
});


module.exports = router;
