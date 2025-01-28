"use server";

import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";

import bcrypt from "bcryptjs";

export default async function serverSignUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  try {
    await connectDB();

    const userFound = await User.findOne({ email });
    console.log(userFound);
    if (userFound) {
      console.log("Email already exists!");
      return {
        error: "Email already exists!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    console.log("Registration successful:", savedUser);

    return {
      message: "Registration successful",
      user: {
        id: savedUser._id.toString(),
        email: savedUser.email,
      },
    };
  } catch (error) {
    console.error("Error during registration:", error);

    return {
      error: "An error occurred during registration.",
    };
  }
}
