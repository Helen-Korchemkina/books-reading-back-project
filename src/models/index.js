const { User, userSchemas } = require('./user');
const { Book, bookJoiSchemas } = require('./book');
const { Statistics, statisticsJoiSchema } = require('./statistics');
const Session = require('./session');
const { Quote, quoteSchemas } = require('./quote');
const OTP = require('./OTP');
module.exports = {
  User,
  Book,
  Statistics,
  Session,
  Quote,
  OTP,
  userSchemas,
  bookJoiSchemas,
  statisticsJoiSchema,
  quoteSchemas
};
