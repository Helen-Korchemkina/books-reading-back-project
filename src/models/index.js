const { User, schemas } = require('./user');
const { Book, bookJoiSchemas } = require('./book');
const { Statistics, statisticsJoiSchema } = require('./statistics');
const Session = require('./session');

module.exports = {
  User,
  Book,
  Statistics,
  Session,
  schemas,
  bookJoiSchemas,
  statisticsJoiSchema,
};
