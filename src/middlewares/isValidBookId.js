const { isValidObjectId } = require("mongoose");

const { RequestError } = require("../helpers");

const isValidBookId = (req, _, next) => {
  const { bookId } = req.params;
  const isCorrectId = isValidObjectId(bookId);
  if (!isCorrectId) {
    const error = RequestError(400, `${bookId} is not corrent id format`);
    next(error);
  }
  next();
};

module.exports = isValidBookId;
