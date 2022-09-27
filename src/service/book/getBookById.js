const { Book } = require("../../models");

const getBookById = async (id) => {
  return await Book.findById({ _id: id }).select({
    owner: 0,
    createdAt: 0,
    updatedAt: 0,
  });
};

module.exports = getBookById;
