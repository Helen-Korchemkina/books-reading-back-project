const express = require('express');

const bookControllers = require('../../controllers/book');
const { controllerWrapper } = require('../../helpers');
const { validationBody, authenticate } = require('../../middlewares');
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
  '/:bookId',
  validationBody(bookJoiSchemas.addSchema),
  controllerWrapper(bookControllers.updateBook)
);

routerBook.patch(
  '/:bookId/review',
  validationBody(bookJoiSchemas.reviewSchema),
  controllerWrapper(bookControllers.addReviews)
);

routerBook.patch(
  '/:bookId/status',
  validationBody(bookJoiSchemas.updateStatus),
  controllerWrapper(bookControllers.updateBook)
);

routerBook.delete('/:bookId', controllerWrapper(bookControllers.deleteBook));

module.exports = routerBook;
