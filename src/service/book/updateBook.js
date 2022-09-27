const { Book } = require("../../models");

const updateBook = async (bookId, body) => {
  return await Book.findByIdAndUpdate({ _id: bookId }, body, {
    new: true,
  }).select({ owner: 0, createdAt: 0, updatedAt: 0 });
};

module.exports = updateBook;
