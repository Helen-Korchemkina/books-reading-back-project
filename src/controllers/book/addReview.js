const { RequestError, idComparison } = require('../../helpers');
const bookService = require('../../service/book');

const addReviews = async (req, res) => {
  const { _id } = req.user;
  const { bookId } = req.params;
  const { rating, resume } = req.body;

  const book = await bookService.getBookById(bookId);
  if (!book) throw RequestError(404, 'Bad request');

  idComparison(_id, book.owner);

  await bookService.updateBook(bookId, { rating, resume });

  res.status(200).json({ data: { message: 'Review added' } });
};

module.exports = addReviews;
