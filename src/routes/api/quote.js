const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/quote');
const { controllerWrapper } = require('../../helpers');
const { validationBody, isValidQuoteId } = require('../../middlewares');
const { quoteSchemas } = require('../../models');


router.get('/', controllerWrapper(ctrl.allQuotes));

router.get('/random', controllerWrapper(ctrl.randomQuote));

router.post('/', validationBody(quoteSchemas.joiQuoteSchema), controllerWrapper(ctrl.addQuote));

router.delete('/:id', isValidQuoteId, controllerWrapper(ctrl.deleteQuote));

module.exports = router;