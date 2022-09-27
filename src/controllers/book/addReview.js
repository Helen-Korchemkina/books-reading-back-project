const { RequestError } = require('../../helpers');
const bookService = require('../../service/book');

const addReviews = async (req, res) => {
  const { bookId } = req.params;
  const { rating, resume } = req.body;

  const book = bookService.updateBook(bookId, { rating, resume });
  if (!book) throw RequestError(404, 'Not found');

  res.status(200).json({ data: { message: 'Review added' } });
};

module.exports = addReviews;
