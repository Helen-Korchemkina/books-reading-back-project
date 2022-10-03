const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/user');
const { controllerWrapper } = require('../../helpers');
const { authenticate, validationBody } = require('../../middlewares');
const { schemas } = require('../../models');

router.get('/current', authenticate, controllerWrapper(ctrl.currentUser));

router.get('/training', authenticate, controllerWrapper(ctrl.currentTraining));

router.patch(
  '/training',
  authenticate,
  validationBody(schemas.joiTrainingSchema),
  controllerWrapper(ctrl.addTraining)
);

module.exports = router;
