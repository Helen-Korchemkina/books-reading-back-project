const { User, userSchemas } = require('./user');
const { Book, bookJoiSchemas } = require('./book');
const { Statistics, statisticsJoiSchema } = require('./statistics');
const Session = require('./session');
const { Quote, quoteSchemas } = require('./quote');

module.exports = {
  User,
  Book,
  Statistics,
  Session,
  Quote,
  userSchemas,
  bookJoiSchemas,
  statisticsJoiSchema,
  quoteSchemas
};
