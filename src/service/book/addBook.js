const { Book } = require('../../models');

const addBook = async (body, userId) => {
  const { title, author } = body;
  const book = await Book.findOne({ title, author, owner: userId });
  if (book) return null;

  const newBook = await Book.create({ ...body, owner: userId });
  return newBook;
};

module.exports = addBook;
