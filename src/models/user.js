const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleSchemaValidationError,
  dateTrainingValidation,
} = require('../helpers');

const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[\w.]+@[\w.]+.[\w.]+$/;
const passwordRegex = /^[a-z0-9A-Z_-]+$/;
const dateMessage = {
  'string.min': `{#label} should have a minimum length of {#limit}`,
  'string.pattern.base': `{#label} should have contain only numbers`,
  'string.empty': `{#label} is not allowed to be empty`,
  'any.required': `{#label} is a required field`,
};
const passwordMessage = {
  'string.min': `{#label} should have a minimum length of {#limit}`,
  'string.max': `{#label} should have a maximum length of {#limit}`,
  'string.pattern.base': `{#label} may contain alphabet and symbols [_-]`,
  'string.empty': `{#label} is not allowed to be empty`,
  'any.required': `{#label} is a required field`,
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: [nameRegex, 'Name must contain only letters'],
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
    training: {
      type: Object,
      default: {},
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSchemaValidationError);

const joiRegisterSchema = Joi.object({
  name: Joi.string().pattern(nameRegex).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .min(6)
    .max(35)
    .required()
    .messages(passwordMessage),
  confirm_password: Joi.string().required().valid(Joi.ref('password')),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .min(6)
    .max(35)
    .required()
    .messages(passwordMessage),
});

const joiTrainingSchema = Joi.object({
  date_start: Joi.string()
    .min(13)
    .pattern(/^[0-9]+$/)
    .custom(dateTrainingValidation)
    .required()
    .messages(dateMessage),
  date_finish: Joi.string()
    .min(13)
    .pattern(/^[0-9]+$/)
    .custom(dateTrainingValidation)
    .required()
    .messages(dateMessage),
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
