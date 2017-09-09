var express = require('express');
var router = express.Router();
var RoomPage = require('./room-page');


/* Main dashboard page. */
router.get('/', function(req, res, next) {
  let roomPage = new RoomPage();
  roomPage.create()
    .then(() => roomPage.render(res))
    .catch(error => next(error));
});

router.get('/:pageNumber', function(req, res, next) {
  let roomPage = new RoomPage({
    pageNumber: parseInt(req.params.pageNumber, 10)
  });
  roomPage.create()
    .then(() => roomPage.render(res))
    .catch(error => next(error));
});

router.get('/room/:pageNumber', function(req, res, next) {
  let roomPage = new RoomPage({
    pageNumber: parseInt(req.params.pageNumber, 10),
    pageSize: 1
  });
  roomPage.create()
    .then(() => roomPage.render(res))
    .catch(error => next(error));
});

module.exports = router;
