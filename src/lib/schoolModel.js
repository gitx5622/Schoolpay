// src/models/userModel.js

import mongoose from "mongoose";
// import Country from "./countryModel";

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name of the school"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email of the school"],
      unique: true,
    },
    location: {
      type: String,
      required: [true, "Please provide a location of the school"],
    },
    account_no: {
      type: String,
      required: [true, "Please provide a account number of the school"],
    },
    // country: Country,
  },
  { timestamps: true }
);

const School =
  mongoose.models.schools || mongoose.model("schools", schoolSchema);

export default School;
