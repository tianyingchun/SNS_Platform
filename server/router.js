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

/** get all task under product */
router.get('/products/:id/tasks', ProductCtrl.getTasks);
/** get specific task under product */
router.get('/products/:id/tasks/:tid', ProductCtrl.getTaskById);
/** create tasks under product */
router.post('/products/:id/tasks', ProductCtrl.createTasks);
/** udpate multi tasks under product */
router.put('/products/:id/tasks', ProductCtrl.updateTasks);
/** update specific task under product */
router.put('/products/:id/tasks/:tid', ProductCtrl.updateTaskById);
/** delete specific task under product */
router.delete('/products/:id/tasks/:tid', ProductCtrl.deleteTaskById);
/** delete multi tasks under product */
router.delete('/products/:id/tasks', ProductCtrl.deleteMultiTasks);

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
