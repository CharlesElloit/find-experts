import mongoose, { Schema } from "mongoose";
import IEmployer from "../interfaces/employer-interface";

const employerSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cellPhone: {
      type: String,
      required: [true, "cell phone field is required"],
    },
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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IEmployer>("Employer", employerSchema);
