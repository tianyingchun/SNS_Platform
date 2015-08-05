var express = require('express');
var router = express.Router();

var productService = require('../services/ProductService.js');

var ProductCtrl = {
  index: function (req, res) {
    res.send('11');
  },

  show: function () {

  },

  create: function () {

  },

  update: function () {

  },

  delete: function () {

  }
};

module.exports = ProductCtrl;
