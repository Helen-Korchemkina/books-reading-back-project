const { Statistics } = require('../../models');

const addStatistics = async userId => {
  return await Statistics.create({ owner: userId });
};

module.exports = addStatistics;
