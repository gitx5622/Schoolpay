import { connect } from "@/utils";
import Student from "@/lib/studentModel";
import { NextResponse } from "next/server";

connect();
// Calls the connect function to establish a connection to the database.

export async function GET(request, { params }) {
  try {
    const studentId = params.studentId;
    
    if (!studentId) {
      return NextResponse.json(
        { error: "Missing 'id' parameter" },
        { status: 400 }
      );
    }

    //check if student exists
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return NextResponse.json(
        { error: "Student does not exist" },
        { status: 400 }
      );
    }

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: "Student Details fetched successsfully",
      success: true,
      data: student,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
