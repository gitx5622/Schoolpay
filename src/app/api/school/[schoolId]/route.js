import { connect } from "@/utils";
import School from "@/lib/schoolModel";
import { NextResponse } from "next/server";

connect();
// Calls the connect function to establish a connection to the database.

export async function GET(request, { params }) {
  try {
    const schoolId = params.schoolId;
    
    if (!schoolId) {
      return NextResponse.json(
        { error: "Missing 'id' parameter" },
        { status: 400 }
      );
    }

    //check if school exists
    const school = await School.findOne({ _id: schoolId });

    if (!school) {
      return NextResponse.json(
        { error: "School does not exist" },
        { status: 400 }
      );
    }

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: "School Details fetched successsfully",
      success: true,
      data: school,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
