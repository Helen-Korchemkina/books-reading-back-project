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
  validationBody(bookJoiSchemas.j2saddSchema),
  controllerWrapper(bookControllers.addBook)
);

routerBook.patch(
  '/:bookId',
  validationBody(bookJoiSchemas.j2saddSchema),
  controllerWrapper(bookControllers.updateBook)
);

routerBook.patch(
  '/:bookId/review',
  validationBody(bookJoiSchemas.j2sreviewSchema),
  controllerWrapper(bookControllers.addReviews)
);

routerBook.patch(
  '/:bookId/status',
  validationBody(bookJoiSchemas.j2supdateStatus),
  controllerWrapper(bookControllers.updateBook)
);

routerBook.delete('/:bookId', controllerWrapper(bookControllers.deleteBook));

module.exports = routerBook;
