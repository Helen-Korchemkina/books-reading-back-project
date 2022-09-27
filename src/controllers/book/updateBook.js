const bookService = require('../../service/book');
const { RequestError } = require('../../helpers');

const updateBook = async (req, res) => {
  const { bookId } = req.params;

  const book = await bookService.updateBook(bookId, req.body);
  if (!book) throw RequestError(404, 'No such book exists');

  res.status(200).json({ data: { book: updateBook, message: 'Book update' } });
};

module.exports = updateBook;
