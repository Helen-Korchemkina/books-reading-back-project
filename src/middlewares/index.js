const authenticate = require('./authenticate');
const isValidId = require('./isValidId');
const validationBody = require('./validationBody');

module.exports = {
  isValidId,
  authenticate,
  validationBody,
};
