const statisticsService = require('../../service/statistics');
const { RequestError } = require('../../helpers');

const getStatistics = async (req, res) => {
  const { _id: userId } = req.user;

  const statistics = await statisticsService.getStatistics(userId);
  if (!statistics) throw RequestError(404, 'Bad request');

  res.status(200).json({ data: { statistics: [statistics] } });
};

module.exports = getStatistics;
