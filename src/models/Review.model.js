const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  comment: {
    type: String, required: true, trim: true, max: 300,
  },
  created: {
    At: { type: Date, default: Date.now },
    created_by: {
      type: Schema.Types.ObjectId, ref: "User",
    },
  },
  updated: {
    At: { type: Date, default: Date.now },
  },
});

module.exports = model("Review", reviewSchema);
