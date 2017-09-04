var express = require('express');
var router = express.Router();
var page = require('./room-page');

/* Main dashboard page. */
router.get('/', function(req, res) {
  page.render({
    view: 'room/index',
    pageNumber: 1,
    req: req,
    res: res
  });
});

router.get('/:pageNumber', function(req, res) {
  page.render({
    view: 'room/index',
    pageNumber: parseInt(req.params.pageNumber, 10) || 1,
    req: req,
    res: res
  });
});

/* Detail room view */
router.get('/room/:pageNumber', function(req, res) {
  page.render({
    view: 'room/detail',
    pageNumber: parseInt(req.params.pageNumber, 10) || 1,
    req: req,
    res: res,
    limit: 1
  });
});

module.exports = router;
