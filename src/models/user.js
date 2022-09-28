const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationError, dateTrainingValidation } = require('../helpers');

const emailRegex = /^[\w.]+@[\w.]+.[\w.]+$/;
const passwordRegex = /^[a-z0-9A-Z_-]{6,35}$/;
const passwordErrorTitle = 'Password contains invalid characters or length is not from 6 to 35 characters';
const dateRegex = /^[0-9]{13,}$/;
const dateErrorTitle = 'Date must be in milliseconds and cannot be in the past';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegex,
    unique: true,
  },
  password: {
    type: String,
    default: '',
  },
  token: {
    type: String,
    default: '',
  },
  training: {
    type: Object,
    default: {},
  }
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleSchemaValidationError);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(emailRegex)
    .required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .error(new Error(passwordErrorTitle))
    .required(),
  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref('password')),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .error(new Error(passwordErrorTitle))
    .required(),
});

const joiTrainingSchema = Joi.object({
  date_start: Joi.string()
    .pattern(dateRegex)
    .error(new Error(dateErrorTitle))
    .custom(dateTrainingValidation)
    .required(),
  date_finish: Joi.string()
    .pattern(dateRegex)
    .error(new Error(dateErrorTitle))
    .custom(dateTrainingValidation)
    .required(),
});

const schemas = {
  joiRegisterSchema,
  joiLoginSchema,
  joiTrainingSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
