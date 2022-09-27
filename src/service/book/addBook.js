const { Book } = require("../../models");

const addBook = async (body, userId) => {
  const { title } = body;
  const book = await Book.findOne({ title, owner: userId });
  if (book) return null;

  const newBook = await Book.create({ ...body, owner: userId });
  return newBook;
};

module.exports = addBook;
