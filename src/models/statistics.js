const { Schema, model } = require('mongoose');
const Joi = require('joi');
const {
  handleSchemaValidationError,
  dateTrainingValidation,
} = require('../helpers');

const dateMessage = {
  'string.min': `{#label} should have a minimum length of {#limit}`,
  'string.pattern.base': `{#label} should have contain only numbers`,
  'string.empty': `{#label} is not allowed to be empty`,
  'any.required': `{#label} is a required field`,
};

const statisticsSchema = new Schema(
  {
    readDate: {
      type: Array,
      requiered: true,
      default: [],
    },
    numberOfPagesRead: {
      type: Array,
      requiered: true,
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

statisticsSchema.post('save', handleSchemaValidationError);

const addStatistics = Joi.object({
  readDate: Joi.string()
    .allow(null)
    .min(13)
    .pattern(/^[0-9]+$/)
    .custom(dateTrainingValidation)
    .required()
    .messages(dateMessage),
  numberOfPagesRead: Joi.number().allow(null).required(),
});

const statisticsJoiSchema = {
  addStatistics,
};

const Statistics = model('statistics', statisticsSchema);

module.exports = {
  Statistics,
  statisticsJoiSchema,
};
