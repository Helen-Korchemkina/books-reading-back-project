const bookService = require('../../service/book');
const { RequestError } = require('../../helpers');

const getAllBooks = async (req, res) => {
  const { id } = req.user;
  console.log('_id :>> ', id);

  const allBooks = await bookService.getAllBooks(id);
  if (allBooks.length === 0) throw RequestError(404, 'No books');

  res.status(200).json({ data: allBooks });
};

module.exports = getAllBooks;
