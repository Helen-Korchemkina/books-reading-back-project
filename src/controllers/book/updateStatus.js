const bookService = require('../../service/book');
const { RequestError, idComparison } = require('../../helpers');

const updateStatus = async (req, res) => {
  const { _id } = req.user;
  const { bookId } = req.params;
  const { status } = req.body;

  const book = await bookService.updateBook(bookId, { status });

  if (!book) throw RequestError(404, 'Bad request');

  idComparison(_id, book.owner);

  res.status(200).json({ data: { book, message: 'Status update' } });
};

module.exports = updateStatus;
