const express = require("express");

const bookControllers = require("../../controllers/book");
const { controllerWrapper } = require("../../helpers");
const { validationBody, authenticate } = require("../../middlewares");
const { bookJoiSchemas, statisticsJoiSchema } = require("../../models");
const routerBook = express.Router();

routerBook.use(authenticate);

routerBook.get("/", controllerWrapper(bookControllers.getAllBooks));

routerBook.post(
  "/",
  validationBody(bookJoiSchemas.addSchema),
  controllerWrapper(bookControllers.add)
);

routerBook.patch(
  "/:bookId",
  validationBody(bookJoiSchemas.addSchema),
  controllerWrapper(bookControllers.updateBook)
);

routerBook.patch(
  "/:bookId/review",
  validationBody(bookJoiSchemas.reviewSchema),
  controllerWrapper(bookControllers.addReviews)
);

routerBook.patch(
  "/:bookId/statistics",
  validationBody(statisticsJoiSchema.addStatistics),
  controllerWrapper(bookControllers.updateStatistics)
);

routerBook.delete("/:bookId", controllerWrapper(bookControllers.deleteBook));

module.exports = routerBook;
