import { connect } from "@/utils";
import { NextResponse } from "next/server";
import User from "@/lib/models";

connect();

export async function GET(request) {
  try {
    // Find the user in the database based on the user ID
    const users = await User.find();
    return NextResponse.json({
      message: "Users found",
      data: users,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
