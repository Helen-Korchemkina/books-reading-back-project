const { Book } = require('../../models');

const getAllBooks = async userId => {
  return await Book.find({ owner: userId })
    .populate('owner', '_id email name')
    .select({ owner: 0, createdAt: 0, updatedAt: 0 });
};

module.exports = getAllBooks;
