const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const serviceSchema = new Schema({
  serviceName: {
    type: String, trim: true, required: [true, "Service name field is required"],
  },
  serviceDate: { type: Date, default: Date.now },
  serviceTime: { type: Date, default: Date.now },
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

module.exports = model("Service", serviceSchema);
