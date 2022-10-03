const bookService = require('../../service/book');

const getAllBooks = async (req, res) => {
  const { id } = req.user;

  const allBooks = await bookService.getAllBooks(id);
  if (allBooks.length === 0)
    return res.status(200).json({ data: { books: [] } });

  res.status(200).json({ data: { books: allBooks } });
};

module.exports = getAllBooks;
