const bookService = require('../../service/book');
const { RequestError } = require('../../helpers');

const deleteBook = async (req, res) => {
  const { _id } = req.user;
  const { bookId } = req.params;

  const book = bookService.getBookById(bookId);
  if (!book) throw RequestError(404, 'Not found');

  if (_id !== book.owner._id) throw RequestError(401, 'Not authorized');

  await bookService.deleteBook(bookId);

  res.status(200).json({ data: { message: 'book deleted' } });
};

module.exports = deleteBook;
