var debug = require('debug')('app:ProductCtrl');
var ProductService = require('../services/ProductService.js');
var Error = require('../constants/Error');

var ProductCtrl = {
  /**
   * defalut return all valid products
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  index: function (req, res, next) {
    var params = {};
    params.type = req.query.type;
    params.page = req.query.page || 1;
    params.size = req.query.size || 10;
    debug('params: ', params);

    ProductService.findAllProducts(params).then(function (products) {
      res.send(products);
    }).catch(function (error) {
      next(error);
    });
  },

  /**
   * return a valid product.
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  show: function (req, res, next) {
    var id = req.params.id;
    var type = req.query.type;
    debug('product id: %s', id);

    ProductService.findProductById(id, type).then(function (product) {
      res.send(product);
    }).catch(function (error) {
      next(error);
    });
  },

  /**
   * create a product with user.
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  create: function (req, res, next) {
    var product = req.body;
    var user = req.authInfo;
    ProductService.createProduct(product, user).then(function (product) {
      res.send(product);
    }).catch(function (error) {
      next(error);
    });
  },

  update: function (req, res, next) {
    var product = req.body;
    product.id = req.params.id;
    var user = req.authInfo;

    ProductService.updateProduct(product, user).then(function (product) {
      res.send(product);
    }).catch(function (error) {
      next(error);
    });
  },

  delete: function (req, res, next) {
    var id = req.params.id;
    var user = req.authInfo;
    ProductService.deleteProduct(id, user).then(function (product) {
      res.send(product);
    }).catch(function (error) {
      next(error);
    });
  }
};

module.exports = ProductCtrl;
