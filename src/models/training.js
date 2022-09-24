const { Schema, model } = require("mongoose");
const Joi = require("joi");

const trainingSchema = Schema({
  start: {
    type: Date,
    required: true,
  },
  finish: {
    type: Date,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "book",
    required: true,
  },
});

const joiTrainingSchema = Joi.object({
  start: Joi.date().required(),
  finish: Joi.date().required(),
});

const Training = model("training", trainingSchema);

module.exports = {
  Training,
  joiTrainingSchema,
};
