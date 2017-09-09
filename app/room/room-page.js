let Room = require('./room');
let Page = require('./page');
let config = require('../config');

let RoomPage = class RoomPage extends Page {
  constructor(options = {}) {
    super(options);
    this.room = new Room();
  }

  isDetailPage() {
    return this.pageSize === 1;
  }

  async create() {
    this.itemCount = await this.room.count();
    this.rooms     = await this.room.get(this.getOffset(), this.pageSize);

    this.pageData = {
      title:      this.isDetailPage() ? this.rooms[0].name : config.appName,
      pageNumber: this.pageNumber,
      pageCount:  this.getPageCount(),
      pageSize:   this.pageSize,
      prevPage:   this.prevPage(),
      nextPage:   this.nextPage(),
      rooms:      this.rooms,
      offset:     this.getOffset()
    };
  }

  render(res) {
    if (this.isDetailPage())
      res.render('room/views/detail', this.pageData);
    else
      res.render('room/views/index', this.pageData);
  }
};
module.exports = RoomPage;
