const express = require('express');

const statisticsController = require('../../controllers/statistics');
const { controllerWrapper } = require('../../helpers');
const { validationBody, authenticate } = require('../../middlewares');
const { statisticsJoiSchema } = require('../../models');

const routerStatistics = express.Router();

routerStatistics.use(authenticate);

routerStatistics.get(
  '/',
  controllerWrapper(statisticsController.getStatistics)
);

routerStatistics.patch(
  '/:userId',
  validationBody(statisticsJoiSchema.j2sAddStatistics),
  controllerWrapper(statisticsController.updateStatistics)
);

module.exports = routerStatistics;
