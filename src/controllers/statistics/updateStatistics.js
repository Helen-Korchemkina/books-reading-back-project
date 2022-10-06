const statisticsService = require('../../service/statistics');
const { RequestError } = require('../../helpers');

const updateStatistics = async (req, res) => {
  const { _id } = req.user;
  const { readDate, numberOfPagesRead } = req.body;
  let body = {};

  const getStatistics = await statisticsService.getStatistics(_id);
  if (!getStatistics) throw RequestError(404, 'Bad request');

  if (readDate === null || numberOfPagesRead === null) {
    body = {
      readDate: [],
      numberOfPagesRead: [],
    };
  } else {
    body = {
      readDate: [...getStatistics.readDate, readDate],
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
