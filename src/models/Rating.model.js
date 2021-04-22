const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema, model } = mongoose;

exports.ratingValidation = (data) => {
  const schema = Joi.object({
    rating: Joi.number().min(0).max(5),
  });
  return schema.validate(data);
};

const ratingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: "User",
  },
  rating: { type: Number, default: 0 },
  created: {
    At: { type: Date, default: Date.now },
    created_by: {
      type: Schema.Types.ObjectId, ref: "User",
    },
  },
  updated: {
    type: Date, default: Date.now,
  },
});

module.exports = model("Rating", ratingSchema);
