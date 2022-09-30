const { Statistics } = require('../../models');

const getStatistics = async userId => {
  return await Statistics.findOne({ owner: userId }).select({
    owner: 0,
    createdAt: 0,
    updatedAt: 0,
  });
};

module.exports = getStatistics;
