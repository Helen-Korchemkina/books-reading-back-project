const { Schema, model } = require("mongoose");
const Joi = require("joi");

const bookSchema = Schema(
  {
    title: {
      type: String,
      requiered: [true, "book title is required"],
    },
    author: {
      type: String,
      requiered: [true, "author title is required"],
    },
    date: {
      type: String,
      require: true,
    },
    pages: {
      type: String,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      requiered: true,
      enum: ["Going to read", "Already read", "Reading now"],
      default: "Going to read",
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
    },
  },
  { versionKey: false, timestamps: true }
);

const joiBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  date: Joi.string().required(),
  pages: Joi.string().required(),
  status: Joi.string().required(),
  rating: Joi.number().required(),
  resume: Joi.string(),
});

const Book = model("book", bookSchema);

module.exports = {
  Book,
  joiBookSchema,
};
