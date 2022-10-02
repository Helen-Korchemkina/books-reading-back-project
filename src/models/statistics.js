const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationError } = require('../helpers');

const statisticsSchema = new Schema(
  {
    readDate: {
      type: Array,
      requiered: true,
      default: [],
    },
    readTime: {
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
  readDate: Joi.string().allow(null).required(),
  readTime: Joi.string().allow(null).required(),
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
