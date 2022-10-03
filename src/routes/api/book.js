const express = require('express');

const bookControllers = require('../../controllers/book');
const { controllerWrapper } = require('../../helpers');
const {
  validationBody,
  authenticate,
  isValidId,
} = require('../../middlewares');
const { bookJoiSchemas } = require('../../models');
const routerBook = express.Router();

routerBook.use(authenticate);

routerBook.get('/', controllerWrapper(bookControllers.getAllBooks));

routerBook.post(
  '/',
  validationBody(bookJoiSchemas.addSchema),
  controllerWrapper(bookControllers.addBook)
);

routerBook.patch(
  '/:bookId/review',
  isValidId,
  validationBody(bookJoiSchemas.reviewSchema),
  controllerWrapper(bookControllers.addReviews)
);

routerBook.patch(
  '/:bookId/status',
  isValidId,
  validationBody(bookJoiSchemas.updateStatus),
  controllerWrapper(bookControllers.updateStatus)
);

routerBook.delete(
  '/:bookId',
  isValidId,
  controllerWrapper(bookControllers.deleteBook)
);

module.exports = routerBook;
