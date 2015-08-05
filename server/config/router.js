var cors = require('cors');
var router = require('express').Router();

var ProductCtrl = require('../controllers/ProductCtrl');
var UserCtrl = require('../controllers/UserCtrl');


/** get all products */
router.get('/products', );
/** get a product by id */
router.get('/products/:id', productService.findProductById);
/** create a product*/
router.post('/products', productService.createProduct);
/** udpate a product by id */
router.put('/products/:id', productService.updateProduct);
/** delete a product by id */
router.delete('/products/:id', productService.deleteProduct);

/** get all users */
router.get('/users', );
/** get a user by id */
router.get('/users/:id', userervice.findUserById);
/** create a user*/
router.post('/users', userervice.createUser);
/** udpate a user by id */
router.put('/users/:id', userervice.updateUser);
/** delete a user by id */
router.delete('/users/:id', userervice.deleteUser);




module.exports = router;

