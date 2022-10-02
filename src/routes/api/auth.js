const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { controllerWrapper } = require('../../helpers');
const { authenticate, validationBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.post(
  '/register',
  validationBody(schemas.joiRegisterSchema),
  controllerWrapper(ctrl.register)
);

router.post(
  '/login',
  validationBody(schemas.joiLoginSchema),
  controllerWrapper(ctrl.login)
);

router.get('/logout', authenticate, controllerWrapper(ctrl.logout));

router.get('/google', controllerWrapper(ctrl.googleAuth));

router.get('/google-redirect', controllerWrapper(ctrl.googleRedirect));

module.exports = router;
