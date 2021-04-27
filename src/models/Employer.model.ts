const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const employerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, ref: "User", required: true,
  },
  cellPhone: { type: String, required: [true, "cell phone field is required"] },
  officeOrHomeNo: { type: String },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    address: { type: String },
  },
}, {
  timestamp: true,
});

module.exports = model("Employer", employerSchema);
