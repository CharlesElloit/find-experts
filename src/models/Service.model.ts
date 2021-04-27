/* eslint-disable func-names */
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String, trim: true, required: [true, "Service name field is required"],
  },
  serviceDate: { type: Date },
  serviceTime: { type: Date },
  selectContractor: {
    type: Schema.Types.ObjectId, ref: "Contractor", required: true,
  },
  contractors: [{ type: Schema.Types.ObjectId, ref: "Contractor" }],
  employerId: {
    type: Schema.Types.ObjectId, ref: "Employer", required: true,
  },
  priceRange: { type: Number },
  pending: { type: Boolean },
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
    address: { type: String, required: [true, "Address is field required"] },
  },
}, {
  timestamp: true,
});

serviceSchema.pre("save", function (next) {
  const date = new Date();
  if (!this.serviceDate) {
    this.serviceDate = date;
  }

  if (!this.serviceTime) {
    this.serviceDate = date.now();
  }
  next();
});

module.exports = model("Service", serviceSchema);
