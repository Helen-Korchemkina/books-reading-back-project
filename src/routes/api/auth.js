const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { authenticate } = require('../../middlewares');

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.get('/logout', authenticate, ctrl.logout);

router.get('/google', ctrl.googleAuth);

router.get('/google-redirect', ctrl.googleRedirect);

module.exports = router;