import mongoose, { Schema } from "mongoose";
import IReview from "../interfaces/review-interface";

const reviewSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  comment: {
    type: String,
    required: true,
    trim: true,
    max: 300,
  },
  created: {
    At: { type: Date, default: Date.now },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  updated: {
    At: { type: Date, default: Date.now },
  },
});

export default mongoose.model<IReview>("Review", reviewSchema);
