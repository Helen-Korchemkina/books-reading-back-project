const { isValidObjectId } = require('mongoose');
const { RequestError } = require('../helpers');

const isValidQuoteId = (req, _, next) => {
  const { id } = req.params;
  const correctId = isValidObjectId(id);

  if (!correctId) {
    const error = RequestError(400, `${id} is not correct id format`);
    next(error);
  }

  next();
};

module.exports = isValidQuoteId;