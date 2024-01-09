import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide country name"],
    },
  },
  { timestamps: true }
);

const Country =
  mongoose.models.countries || mongoose.model("countries", countrySchema);

export default Country;
