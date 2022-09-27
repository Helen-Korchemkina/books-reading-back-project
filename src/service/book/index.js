const addBook = require("./addBook");
const addStatistics = require("./addStatistics");
const getAllBooks = require("./getAllBooks");
const deleteBook = require("./deleteBook");
const updateBook = require("./updateBook");
const getBookById = require("./getBookById");
const getStatistics = require("./getStatistics");
const updateStatistics = require("./updateStatistics");

const bookService = {
  addBook,
  addStatistics,
  getAllBooks,
  deleteBook,
  updateBook,
  getBookById,
  getStatistics,
  updateStatistics,
};

module.exports = bookService;
