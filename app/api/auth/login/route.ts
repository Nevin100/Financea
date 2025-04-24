import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User.model";
import { loginSchema } from "@/lib/helpers/validations";
import connectDB from "@/lib/database/db_connection";

const JWT_SECRET = process.env.JWT_SECRET as string;

//Login API :
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Empty body Fields :
    if (!body) {
      return NextResponse.json({ error: "Invalid Fields" }, { status: 400 });
    }

    // Validate input using Zod
    const parsedData = loginSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
    }

    // Find user
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check password
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );


    return NextResponse.json({
      message: "Login successful",
      token,
      user: { username: user.username, email: user.email },
    });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" + error }, { status: 500 });
  }
}
