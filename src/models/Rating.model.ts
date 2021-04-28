import Joi from "joi";
import mongoose, { Schema } from "mongoose";
import IRating from "../interfaces/rating-interface";

exports.ratingValidation = (data: object): object => {
  const schema = Joi.object({
    rating: Joi.number().min(0).max(5),
  });
  return schema.validate(data);
};

const ratingSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rating: { type: Number, default: 0 },
  created: {
    At: { type: Date, default: Date.now },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IRating>("Rating", ratingSchema);
