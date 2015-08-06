var router = require('express').Router();
var auth = require('./middlewares/basicAuth');
var ProductCtrl = require('./controllers/ProductCtrl');
var UserCtrl = require('./controllers/UserCtrl');


/** get all products */
router.get('/products', ProductCtrl.index);
/** get a product by id */
router.get('/products/:id', ProductCtrl.show);
/** create a product*/
router.post('/products', ProductCtrl.create);
/** udpate a product by id */
router.put('/products/:id', ProductCtrl.update);
/** delete a product by id */
router.delete('/products/:id', ProductCtrl.delete);

/** get all users */
router.get('/users', auth.security(['administrator']), UserCtrl.index);
/** get a user by id */
router.get('/users/:id', UserCtrl.show);
/** create a user*/
router.post('/users', UserCtrl.create);
/** udpate a user by id */
router.put('/users/:id', UserCtrl.update);
/** delete a user by id */
router.delete('/users/:id', UserCtrl.delete);




module.exports = router;
