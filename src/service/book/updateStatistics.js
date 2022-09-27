const { Statistics } = require('../../models');

const updateStatistics = async (body, bookId) => {
  return await Statistics.findByIdAndUpdate({ _id: bookId }, body, {
    new: true,
  });
};

module.exports = updateStatistics;
