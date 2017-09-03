var express = require('express');
var router = express.Router();
var page = require('./room-page');

/* Main dashboard page. */
router.get('/', function(req, res) {
  page.render({
    view: 'room/index',
    req: req,
    res: res
  });
});

/* Detail room view */
router.get('/room', function(req, res) {
  page.render({
    view: 'room/detail',
    req: req,
    res: res,
    limit: 1
  });
});

module.exports = router;
