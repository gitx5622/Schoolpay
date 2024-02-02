// src/models/userModel.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    description: {
      type: String,
    },
    phone: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
      enum: ["Kenya", "Uganda", "Tanzania", "South Sudan"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
