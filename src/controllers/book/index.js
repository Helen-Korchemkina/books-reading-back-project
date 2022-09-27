const add = require('./addBook');
const updateStatistics = require('./updateStatistics');
const addReviews = require('./addReview');
const getAllBooks = require('./getAllBooks');
const deleteBook = require('./deleteBook');
const updateBook = require('./updateBook');

const bookControllers = {
  add,
  updateStatistics,
  addReviews,
  getAllBooks,
  deleteBook,
  updateBook,
};

module.exports = bookControllers;
