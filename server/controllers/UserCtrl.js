var express = require('express');
var router = express.Router();
var userService = require('../services/UserService.js');


router.get('/:id', userService.findUserById);
/**
 * [exports description]
 * @type {[type]}
 */
module.exports = router;
