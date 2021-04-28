import Joi from "joi";
import mongoose, { Schema } from "mongoose";
import IContractor from "../interfaces/contractor-interface";

export const contractorValidator = (data: object): object => {
  const schema = Joi.object({
    occupation: Joi.string().required().trim().strip(),
    cellphone: Joi.string().trim().required().strip(),
    location: Joi.required(),
    status: Joi.string().trim().required().strip(),
    price: Joi.number().required(),
    bio: Joi.string().max(200).trim().strip(),
  });

  return schema.validate(data);
};

const contractorSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    occupation: {
      type: String,
      trim: true,
      max: 200,
      required: [true, "occupation field is required"],
    },
    cellPhone: {
      type: String,
      required: [true, "cell phone field is required"],
    },
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
      address: { type: String, required: true },
    },
    status: { type: String, required: [true, "Status field is required"] },
    price: { type: Number },
    bio: { type: String, max: 600 },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IContractor>("Contractor", contractorSchema);
