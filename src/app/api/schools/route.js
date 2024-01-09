import { connect } from "@/utils";
import School from "@/lib/schoolModel";
import { NextResponse } from "next/server";

connect();
// Calls the connect function to establish a connection to the database.

export async function POST(request) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    const { name, account_no, location, email } = reqBody;
    // Parses the request body to extract username, email, and password.

    //Checks if a user with the provided email already exists.
    const school = await School.findOne({ email });

    //If yes, returns a 400 response.
    if (school) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newSchool = new School({
      name,
      account_no,
      location,
      email,
    });

    // Saves the new user to the database.
    const savedSchhol = await newSchool.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedSchhol,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
    try {
      // Find the user in the database based on the user ID
      const schools = await School.find();
      return NextResponse.json({
        message: "Schools found",
        data: schools,
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
  