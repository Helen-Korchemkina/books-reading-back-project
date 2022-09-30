const { Statistics } = require('../../models');

const updateStatistics = async (body, userId) => {
  return await Statistics.findByIdAndUpdate({ _id: userId }, body, {
    new: true,
  });
};

module.exports = updateStatistics;
