import { connect } from "@/utils";
import Student from "@/lib/studentModel";
import { NextResponse } from "next/server";
import School from "@/lib/schoolModel";

connect();
// Calls the connect function to establish a connection to the database.

export async function POST(request) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    const { name, admission_no, school, email, location } = reqBody;
    // Parses the request body to extract username, email, and password.

    //Checks if a user with the provided email already exists.
    const schoolID = await School.findOne({ _id: school });

    if (!schoolID) {
      return NextResponse.json(
        { error: "School does not exists" },
        { status: 400 }
      );
    }

    const student = await Student.findOne({ email });

    //If yes, returns a 400 response.
    if (student) {
      return NextResponse.json(
        { error: "Student already exists" },
        { status: 400 }
      );
    }

    const newStudent = new Student({
      name,
      admission_no,
      email,
      location,
      school: schoolID,
    });

    // Saves the new student to the database.
    const savedStudent = await newStudent.save();

    return NextResponse.json({
      message: "Student created successfully",
      success: true,
      data: {
        savedStudent,
        schoolID,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    // Find the user in the database based on the user ID
    const students = await Student.find().populate("school");
    return NextResponse.json({
      message: "Students found",
      data: students,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
