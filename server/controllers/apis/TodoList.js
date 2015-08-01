var express = require('express');
var router = express.Router();
var helper = require("../../helpers");
var logger = require("../../helpers/log");

var TodoService =require('../../services/TodoService');

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
