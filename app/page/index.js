let getPageNumber = (offset, limit) => offset / limit + 1;
let getPageCount = (totalCount, limit) => Math.ceil(totalCount / limit);
let nextPage = (pageNumber, pageCount, offset, limit) => pageNumber === pageCount ? null : offset + limit;
let prevPage = (pageNumber, offset, limit) => pageNumber === 1 ? null : offset - limit;
module.exports.getPageNumber = getPageNumber;
module.exports.getPageCount = getPageCount;
module.exports.nextPage = nextPage;
module.exports.prevPage = prevPage;
