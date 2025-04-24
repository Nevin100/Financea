import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User.model";
import { signupSchema } from "@/lib/helpers/validations";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/database/db_connection";

const JWT_SECRET = process.env.JWT_SECRET as string;

//SignUp API : 
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Empty body Fields :
    if (!body) {
      return NextResponse.json({ error: "Invalid Fields" }, { status: 400 });
    }

    // Validate input using Zod
    const parsedData = signupSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = new User({
      ...body,
      password: hashedPassword
    });

    await newUser.save();

    //Token Generation : 
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    //Response : 
    return NextResponse.json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server issue" + error }, { status: 500 });
  }
}
