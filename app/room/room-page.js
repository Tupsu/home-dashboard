let config = require('../config');
let room = require('./room-api');
let page = require('../page');

let getPageTitle = () => config.appName;

async function getPageData(pageNumber, limit) {
  let offset     = page.getOffsetFrom(pageNumber, limit);
  let totalCount = await room.count();
  let rooms      = await room.get(offset, limit);
  totalCount     = parseInt(totalCount[0].count, 10);
  let pageCount  = page.getPageCount(totalCount, limit);
  return {
    title:      getPageTitle(),
    totalCount: totalCount,
    pageNumber: pageNumber,
    pageCount:  pageCount,
    prevPage:   page.prevPage(pageNumber),
    nextPage:   page.nextPage(pageNumber, pageCount),
    rooms:      rooms,
    offset:     offset
  };
}

let render = ({view, pageNumber, res, limit=config.pageSize} = {}) => {
  getPageData(pageNumber, limit)
    .then(pageData => res.render(view, pageData))
    .catch(error => console.error(error));
};

module.exports.render = render;
