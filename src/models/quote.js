const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationError } = require('../helpers');

const quoteSchema = new Schema(
    {
        quote: {
            type: String,
            required: [true, 'Quote is required'],
        },
        author: {
            type: String,
            required: [true, 'Author of the quote is required'],
        },
    },
    { versionKey: false, timestamps: true }
);

quoteSchema.post('save', handleSchemaValidationError);

const joiQuoteSchema = Joi.object({
  quote: Joi.string().required(),
  author: Joi.string().required()
});

const quoteSchemas = {
  joiQuoteSchema,
};

const Quote = model('quote', quoteSchema);

module.exports = {
  Quote,
  quoteSchemas,
};
