const { User } = require('./user');
const { Book, bookJoiSchemas } = require('./book');
const { Statistics, statisticsJoiSchema } = require('./statistics');

module.exports = {
  User,
  Book,
  Statistics,
  bookJoiSchemas,
  statisticsJoiSchema,
};
