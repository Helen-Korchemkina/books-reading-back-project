const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationError } = require('../helpers');

const bookSchema = Schema(
  {
    title: {
      type: String,
      requiered: [true, 'book title is required'],
    },
    author: {
      type: String,
      requiered: [true, 'author title is required'],
    },
    releaseDate: {
      type: String,
      require: true,
    },
    countOfPages: {
      type: Number,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      requiered: true,
      enum: ['Going to read', 'Already read', 'Reading now'],
      default: 'Going to read',
    },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
      requiered: true,
    },
    resume: {
      type: String,
      requiered: false,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

bookSchema.post('save', handleSchemaValidationError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  releaseDate: Joi.string().required(),
  countOfPages: Joi.number().required(),
});

const reviewSchema = Joi.object({
  rating: Joi.number().required(),
  resume: Joi.string(),
});

const bookJoiSchemas = {
  addSchema,
  reviewSchema,
};

const Book = model('book', bookSchema);

module.exports = {
  Book,
  bookJoiSchemas,
};
