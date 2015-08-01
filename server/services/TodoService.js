var logger = require('../helpers/log');

// data provider singleton.
var dataProvider = require("../dataProvider");
var TodoListDal = dataProvider.getDataAccess("TodoList");
var TodoItemModel = dataProvider.getModel("TodoItem");

function TodoServiceProvider() {
  // instance.
  var todoListDal = new TodoListDal();
  /**
   * @return {promise}
   */
  this.getTodoList = function () {
    return todoListDal.getTodoList();
  };
}

module.exports = TodoServiceProvider;
