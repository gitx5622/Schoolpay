import mongoose from "mongoose";
import { NextResponse } from "next/server";

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
