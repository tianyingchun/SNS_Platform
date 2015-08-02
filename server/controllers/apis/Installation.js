var express = require('express');
var router = express.Router();
var helper = require("../../helpers");
var logger = require("../../helpers/log");

var InstallService = require('../../services/InstallService');

var installService = new InstallService();
/**
 * API:/api/isntallation/initialdb
 * Get all todo items.
 */
router.get("/initialdb", function (req, res) {
  installService.initialMysql().then(function (result) {
    helper.renderJson(res, result);
  }, function (err) {
    helper.renderJson(res, err);
  });
});


module.exports = router;
