const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema, model } = mongoose;

exports.ratingValidation = (data) => {
  const schema = Joi.object({
    rating: Joi.number().min(0).max(5),
    comment: Joi.string().max(300),
  });
  return schema.validate(data);
};

const ratingSchema = new Schema({
  contractorId: {
    type: Schema.Types.ObjectId, ref: "Contractor", required: true,
  },
  employerId: {
    type: Schema.Types.ObjectId, ref: "Employer", required: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId, ref: "Service", required: true,
  },
  rating: { type: Number, default: 0 },
  comment: { type: String, trim: true, max: 300 },
}, {
  timestamp: true,
});

module.exports = model("Rating", ratingSchema);
