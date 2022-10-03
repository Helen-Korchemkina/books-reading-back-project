const { isValidObjectId } = require('mongoose');
const { RequestError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { userId, bookId } = req.params;
  const id = userId || bookId;
  const correctId = isValidObjectId(id);

  if (!correctId) {
    const error = RequestError(400, `${id} is not correct id format`);
    next(error);
  }

  next();
};

module.exports = isValidId;
