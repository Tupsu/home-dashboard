var express = require('express');
var router = express.Router();
var RoomPage = require('./room-page');
let Room = require('./room');

let validate = req => Number.isInteger(parseInt(req.params.pageNumber, 10));

/* Main dashboard page. */
router.get('/', function(req, res, next) {
  let roomPage = new RoomPage();
  roomPage.create()
    .then(() => roomPage.render(res))
    .catch(error => next(error));
});

/* Main dashboard page pagination */
router.get('/:pageNumber', function(req, res, next) {
  if (!validate(req)) {
    next('route');
    return;
  }
  let roomPage = new RoomPage({
    pageNumber: parseInt(req.params.pageNumber, 10)
  });
  roomPage.create()
    .then(() => roomPage.render(res))
    .catch(error => next(error));
});

/* Room detail view */
router.get('/room/:pageNumber', function(req, res, next) {
  if (!validate(req)) {
    next('route');
    return;
  }
  let roomPage = new RoomPage({
    pageNumber: parseInt(req.params.pageNumber, 10),
    pageSize: 1
  });
  roomPage.create()
    .then(() => roomPage.render(res))
    .catch(error => next(error));
});

/* Room API */
router.post('/room/add', async function(req, res) {
  await Room.add({
    name: req.body.name
  }).then(() => res.sendStatus(200)).catch(e => {
    console.error(e);
    res.sendStatus(500);
  });
});

module.exports = router;
