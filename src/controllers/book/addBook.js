const bookService = require('../../service/book');
const { RequestError } = require('../../helpers');

const add = async (req, res) => {
  const { _id } = req.user;
  const { countOfPages } = req.body;
  if (countOfPages <= 0)
    throw RequestError(400, 'The book must have at least one page!');

  const book = await bookService.addBook(req.body, _id);
  if (!book)
    throw RequestError(
      400,
      'A book with the same name by this author has already been added!'
    );
  const statistics = await bookService.addStatistics(book._id);

  res.status(201).json({
    data: {
      book: book,
      statistics,
    },
  });
};

module.exports = add;
