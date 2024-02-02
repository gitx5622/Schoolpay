import mongoose from "mongoose";
import School from "./schoolModel";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name of the student"],
    },
    admission_no: {
      type: String,
      required: [true, "Please provide admission number/ref number"],
      unique: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: School,
      required: true,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide email of the the student"],
      unique: true,
    },
  },
  { timestamps: true }
);

const Student =
  mongoose.models.students || mongoose.model("students", studentSchema);

export default Student;
