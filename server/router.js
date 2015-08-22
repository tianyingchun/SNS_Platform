var router = require('express').Router();
var auth = require('./middlewares/basicAuth');
var ProductCtrl = require('./controllers/ProductCtrl');
var UserCtrl = require('./controllers/UserCtrl');
var RoleName = require('./constants/enum/SystemRoleName');

/** get all products */
router.get('/products', ProductCtrl.index);
/** get a product by id */
router.get('/products/:id', ProductCtrl.show);
/** create a product*/
router.post('/products', auth.authToken(), auth.security([RoleName.Administrators, RoleName.Publisher]), ProductCtrl.create);
/** udpate a product by id */
router.put('/products/:id', auth.authToken(), auth.security([RoleName.Administrators, RoleName.Publisher]), ProductCtrl.update);
/** delete a product by id */
router.delete('/products/:id', auth.authToken(), auth.security([RoleName.Administrators, RoleName.Publisher]), ProductCtrl.delete);

/** get all users */
router.get('/users', auth.authToken(), auth.security([RoleName.Administrators]), UserCtrl.index);
/** get a user by id */
router.get('/users/:id', auth.authToken(), auth.security([RoleName.Administrators, RoleName.Registered]), UserCtrl.show);
/** create a user*/
router.post('/users', UserCtrl.create);
/** udpate a user by id */
router.put('/users/:id', auth.authToken(), auth.security([RoleName.Administrators, RoleName.Registered]), UserCtrl.update);
/** delete a user by id */
router.delete('/users/:id', auth.authToken(), auth.security([RoleName.Administrators]), UserCtrl.delete);

/** user sigin */
router.post('/user/signin', UserCtrl.signin);
// user sign out.
router.post('/user/signout', auth.authToken(), auth.security([RoleName.Registered]), UserCtrl.signout);


module.exports = router;
