const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationError } = require('../helpers');

const emailRegexp = /^[\w.]+@[\w.]+.[\w.]+$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegexp,
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
  startTraining: {
    type: String,
    default: '',
  },
  finishTraining: {
    type: String,
    default: '',
  }
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleSchemaValidationError);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.string().required().valid(Joi.ref('password')),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
    joiRegisterSchema,
    joiLoginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
