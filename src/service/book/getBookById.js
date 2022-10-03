const { Book } = require('../../models');

const getBookById = async id => {
  return await Book.findById({ _id: id }).select({
    createdAt: 0,
    updatedAt: 0,
  });
};

module.exports = getBookById;
