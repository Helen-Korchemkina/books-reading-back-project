const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { authenticate } = require('../../middlewares');

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.get('/logout', authenticate, ctrl.logout);

module.exports = router;