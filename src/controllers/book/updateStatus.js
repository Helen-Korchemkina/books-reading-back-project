const bookService = require('../../service/book');
const { RequestError } = require('../../helpers');

const updateStatus = async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;

  const book = await bookService.updateStatus(bookId, { status });
  if (!book) throw RequestError(404, 'Bad request');

  res.status(200).json({ data: { book, message: 'Status update' } });
};

module.exports = updateStatus;
