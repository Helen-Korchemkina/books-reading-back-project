const addBook = require('./addBook');
const updateStatistics = require('./updateStatistics');
const addReviews = require('./addReview');
const getAllBooks = require('./getAllBooks');
const deleteBook = require('./deleteBook');
const updateBook = require('./updateBook');
const updateStatus = require('./updateStatus');

const bookControllers = {
  addBook,
  updateStatistics,
  addReviews,
  getAllBooks,
  deleteBook,
  updateBook,
  updateStatus,
};

module.exports = bookControllers;
