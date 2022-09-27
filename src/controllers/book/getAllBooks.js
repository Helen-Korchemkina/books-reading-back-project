const bookService = require('../../service/book');
const { RequestError } = require('../../helpers');

const getAllBooks = async (req, res) => {
  const { _id } = req.user;

  const allBooks = await bookService.getAllBooks(_id);
  if (allBooks.length === 0) throw RequestError(404, 'No books');

  const data = [];

  for (const book of allBooks) {
    const statistics = await bookService.getStatistics(book._id);

    data.push({ book, statistics });
  }

  res.status(200).json({ data });
};

module.exports = getAllBooks;
