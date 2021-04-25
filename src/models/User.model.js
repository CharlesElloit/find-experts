/* eslint-disable func-names */
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String, trim: true, min: 3, max: 100, required: [true, "Name field is required"],
  },
  email: {
    type: String, unique: true, lowercase: true, trim: true, max: 255, required: [true, "Email field is required"],
  },
  isContractor: { type: Boolean, default: false },
  password: { type: String, max: 255, required: [true, "Password field must not be empty"] },
  resetPasswordToken: { type: String, max: 255 },
  resetPasswordTokenExpires: { type: Date },
}, {
  timestamps: true,
});

userSchema.statics.generateAccessToken = function () {
  const payload = {
    userId: this._id,
    email: this.email,
    name: this.name,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2s" });
};

userSchema.statics.generateRefreshToken = function () {
  const payload = {
    userId: this._id,
    email: this.email,
    name: this.name,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });
};

module.exports = model("User", userSchema);
