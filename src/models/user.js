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
        required: [true, 'Set password for user'],
        minlength: 6,
    },
    token: {
        type: String,
        default: '',
    },
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleSchemaValidationError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
};

const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      requiered: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      requiered: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  token: Joi.string(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiLoginSchema,
  joiRegisterSchema,
};
