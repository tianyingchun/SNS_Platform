var ProductService = require('../services/ProductService.js');
var debug = require('debug')('app:ProductCtrl');

var ProductCtrl = {
  /**
   * defalut return all valid products
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  index: function (req, res, next) {
    var type = req.query.type;
    ProductService.findAllProducts(type).then(function (products) {
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
    debug('product id: %s', id);
    ProductService.findProductById(id).then(function (product) {
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
