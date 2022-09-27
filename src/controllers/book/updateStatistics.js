const { RequestError } = require('../../helpers');
const bookService = require('../../service/book');

const updateStatistics = async (req, res) => {
  const { bookId } = req.params;
  const { readDate, readTime, numberOfPagesRead } = req.body;

  const getStatistics = await bookService.getStatistics(bookId);
  if (!getStatistics) throw RequestError(404, 'Bad request');
  const body = {
    readDate: [...getStatistics.readDate, readDate],
    readTime: [...getStatistics.readTime, readTime],
    numberOfPagesRead: [...getStatistics.numberOfPagesRead, numberOfPagesRead],
  };
  await bookService.updateStatistics(body, getStatistics._id);

  res.status(200).json({ data: { message: 'Statistics update' } });
};

module.exports = updateStatistics;
