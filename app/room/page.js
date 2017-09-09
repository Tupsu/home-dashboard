let config = require('../config');

let Page = class Page {

  constructor({itemCount = 0, pageNumber = 1, pageSize = config.pageSize}) {
    this.itemCount  = itemCount;
    this.pageNumber = pageNumber;
    this.pageSize   = pageSize;
  }

  getPageCount() {
    return Math.ceil(this.itemCount / this.pageSize);
  }

  prevPage() {
    return this.pageNumber === 1 ? null : this.pageNumber - 1;
  }

  nextPage() {
    return this.pageNumber >= this.getPageCount() ? null : this.pageNumber + 1;
  }

  getOffset() {
    return this.pageNumber === 1 ? 0 : (this.pageNumber - 1) * this.pageSize;
  }
};

module.exports = Page;
