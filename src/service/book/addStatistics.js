const { Statistics } = require("../../models");

const addStatistics = async (bookId) => {
  return await Statistics.create({ owner: bookId });
};

module.exports = addStatistics;
