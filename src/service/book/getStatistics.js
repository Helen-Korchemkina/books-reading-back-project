const { Statistics } = require("../../models");

const getStatistics = async (bookId) => {
  return await Statistics.findOne({ owner: bookId }).select({
    owner: 0,
    createdAt: 0,
    updatedAt: 0,
  });
};

module.exports = getStatistics;
