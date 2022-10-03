const bookService = require('../../service/book');
const { RequestError, idComparison } = require('../../helpers');

const deleteBook = async (req, res) => {
  const { _id } = req.user;
  const { bookId } = req.params;

  const book = await bookService.getBookById(bookId);
  if (!book) throw RequestError(404, 'Not found');

  idComparison(_id, book.owner);

  await bookService.deleteBook(bookId);

  res.status(200).json({ data: { message: 'Book deleted' } });
};

module.exports = deleteBook;
