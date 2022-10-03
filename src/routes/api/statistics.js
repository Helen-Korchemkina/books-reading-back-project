const express = require('express');

const statisticsController = require('../../controllers/statistics');
const { controllerWrapper } = require('../../helpers');
const {
  validationBody,
  authenticate,
  isValidId,
} = require('../../middlewares');
const { statisticsJoiSchema } = require('../../models');

const routerStatistics = express.Router();

routerStatistics.use(authenticate);

routerStatistics.get(
  '/',
  controllerWrapper(statisticsController.getStatistics)
);

routerStatistics.patch(
  '/:userId',
  isValidId,
  validationBody(statisticsJoiSchema.addStatistics),
  controllerWrapper(statisticsController.updateStatistics)
);

module.exports = routerStatistics;
