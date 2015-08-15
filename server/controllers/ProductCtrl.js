var ProductService = require('../services/ProductService.js');
var debug = require('debug')('app:ProductCtrl');

var ProductCtrl = {
  index: function (req, res, next) {
    ProductService.findAllProducts().then(function (products) {
      res.send(products);
    }).catch(function (error) {
      next(error);
    });
  },

  show: function (req, res, next) {
    var id = req.params.id;
    debug('product id: %s', id);
    ProductService.findProductById(id).then(function (product) {
      res.send(product);
    }).catch(function (error) {
      next(error);
    });
  },

  create: function (req, res, next) {
    var product = req.body;
    ProductService.createProduct(product).then(function (product) {

      res.send(product);
    }).catch(function (error) {
      next(error);
    });
  },

  update: function (req, res, next) {
    var product = req.body;
    product.id = req.params.id;

    ProductService.updateProduct(product).then(function (product) {
      res.send(product);
    }).catch(function (error) {
      next(error);
    });
  },

  delete: function (req, res, next) {
    var id = req.params.id;
    ProductService.deleteProduct(id).then(function (product) {
      res.send(product);
    }).catch(function (error) {
      next(error);
    });
  }
};

module.exports = ProductCtrl;
