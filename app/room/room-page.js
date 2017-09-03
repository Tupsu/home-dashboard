let config = require('../config');
let room = require('./room-api');
let page = require('../page');

let getPageTitle = () => config.appName;

async function getPageData(offset, limit) {
  let totalCount = await room.count();
  let rooms      = await room.get(offset, limit);
  let pageNumber = page.getPageNumber(offset, limit);
  let pageCount  = page.getPageCount(totalCount, limit);
  totalCount     = totalCount[0].count;
  return {
    title:      getPageTitle(),
    totalCount: totalCount,
    pageNumber: pageNumber,
    pageCount:  pageCount,
    prevPage:   page.prevPage(pageNumber, offset, limit),
    nextPage:   page.nextPage(pageNumber, pageCount, offset, limit),
    rooms:      rooms,
    offset:     offset
  };
}

let render = ({view, req, res, limit=config.pageSize} = {}) => {
  let offset = parseInt(req.query.offset, 10) || 0;
  getPageData(offset, limit)
    .then(pageData => res.render(view, pageData))
    .catch(error => console.error(error));
};

module.exports.render = render;
