const statisticsService = require('../../service/statistics');
const { RequestError } = require('../../helpers');

const updateStatistics = async (req, res) => {
  const { userId } = req.params;
  const { readDate, readTime, numberOfPagesRead } = req.body;
  let body = {};

  const getStatistics = await statisticsService.getStatistics(userId);
  if (!getStatistics) throw RequestError(404, 'Bad request');

  if (readDate === null || readTime === null || numberOfPagesRead === null) {
    body = {
      readDate: [],
      readTime: [],
      numberOfPagesRead: [],
    };
  } else {
    body = {
      readDate: [...getStatistics.readDate, readDate],
      readTime: [...getStatistics.readTime, readTime],
      numberOfPagesRead: [
        ...getStatistics.numberOfPagesRead,
        numberOfPagesRead,
      ],
    };
  }
  await statisticsService.updateStatistics(body, getStatistics._id);

  res.status(200).json({ data: { message: 'Statistics update' } });
};

module.exports = updateStatistics;
