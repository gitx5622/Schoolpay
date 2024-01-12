import { connect } from "@/utils";
import { NextResponse } from "next/server";
import User from "@/lib/models";

connect();
// Calls the connect function to establish a connection to the database.

export async function GET(request, { params }) {
  try {
    const userId = params.userId;
    
    if (!userId) {
      return NextResponse.json(
        { error: "Missing 'id' parameter" },
        { status: 400 }
      );
    }

    //check if user exists
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Create a JSON response indicating successful login
    const response = NextResponse.json({
      message: "User Details fetched successsfully",
      success: true,
      data: user,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
