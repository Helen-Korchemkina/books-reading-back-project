const { Book } = require('../../models');

const deleteBook = async bookId => {
  return await Book.findOneAndDelete({ _id: bookId });
};

module.exports = deleteBook;
